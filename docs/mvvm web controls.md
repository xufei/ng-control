MVVM时代的Web控件
====

前不久，Yahoo宣布了一个消息，[停止YUI框架的开发](https://news.ycombinator.com/item?id=8243523)，令人很多感慨。YUI作为最知名的控件库之一，影响了几乎整整一代前端开发人员。

为什么停止开发呢？我个人总结的原因是：

- 现在这个时代，除了最基本的模式，控件库已经被极大地多样化，差异化了，所以，不用尝试在一个控件中考虑太多，你再考虑也考虑不完需求，反而会把代码变得臃肿。
- 一些前端MV*模式和Web Components的流行，使得我们可以用更轻松快捷的方式组织界面，在这个过程中，需要重新考虑控件和普通业务界面的分界。

## 控件的分类方式

- 布局增强型，比较典型的是Panel，TabNavigator，Accordion
- 独立功能型，比较典型的是Calendar，Pager
- 表单增强型，比较典型的是DatetimePicker，ColorPicker

对于这些不同类型的控件，我们的处理方式是不同的：

### 布局增强型

所谓布局增强型，意思是它是个容器，最多也就做一下状态切换之类的工作。

在AngularJS的主页上，有这么一个Demo：

```HTML
<tabs>
  <pane title="Localization">
  </pane>
  <pane title="Pluralization">
  </pane>
</tabs>
```

这个Demo做了两个自定义的标签，用于简化实现TabNavigator的HTML代码。原先我们可能要这么写：

```HTML
<ul class="nav nav-tabs" role="tablist">
  <li class="active"><a href="#">Home</a></li>
  <li><a href="#">Profile</a></li>
  <li><a href="#">Messages</a></li>
</ul>
<div class="tab-content">
  ...content
</div>
```

它这么一搞，就比较语义化，代码的可读性增强了。

### 独立功能型

这类控件一般是独立功能的区块，跟外界的联系是松散的，主要通过事件来通讯。

用一个分页控件pager来举例，它每次在当前选中页变更的时候对外发送一个事件，外界监听这个事件，并作出相应的操作。

### 表单增强型

这类控件其实也可以算独立功能型，作这样的划分，主要是考虑到在大部分MVVM框架里，原生的input，select，textarea等都是有特殊增强的，可以直接跟数据模型绑定，它们跟外界唯一的交互就是数据模型。对于像DatetimePicker这样的控件，其实业务方并不关心它内部是怎么实现的，做了什么操作，只需要关注最后的选中值，从这一点来看，它跟普通的input并无区别。

### 划分的依据

作了这样的分类之后，所面临的就是不断的纠结了：这个控件我应该划分到哪类？应该让它直接绑定模型，还是发送事件呢？比如说刚才提到的分页控件，有不少实现是没有用事件，而是直接绑定数据模型的。

对于表单增强型的控件，设计思路一般是没有歧义的，大家都会让它直接绑定数据模型。那独立功能型的控件，为什么不能让它直接绑定数据模型呢？

这个差别主要来源于控件和数据模型的“距离”。表单增强型控件跟数据模型的距离非常近，因此它直接使用数据模型没有问题，但是界面增强型控件，很可能这个距离较远，比如说，至少要从父级视图模型中转一下。

## 控件实现理念的变更

现在流行的新框架很多，AngularJS，Polymer，React，每种都有自己的一套理念，目前各自的生态圈都是不如jQuery的，但我们如果硬把jQuery的控件拖过来，也会很别扭，那怎么办呢？

毛主席教导我们，自己动手，丰衣足食。全新的引擎，就应当有全新的外围，不能开着坦克还射箭，我们试试来自己搞一下。

用每种框架实现控件，都需要遵循它的理念，利用它的优势特性，然后用一些特殊优化来绕过它的弱点。以AngularJS为例，下面用几个典型的控件实现来大致说明它们的理念差异。

### Accordion

有很多界面模式，之前我们会把它做成控件，比如Accordion，TabNavigator，但其实它的内部实现并不复杂，无非是选中项切换，创建或者移除子项等等，而且，还要顺便提供一大堆的参数配置，用于实现界面。

比如，jQuery UI的Accordion实现：[https://github.com/jquery/jquery-ui/blob/master/ui/accordion.js](https://github.com/jquery/jquery-ui/blob/master/ui/accordion.js)，内部封装了各种DOM操作，把HTML打成碎片混在JavaScript中，如果想要做一些UI层面的调整，非常困难。

在MVVM时代，如果借助数据绑定的力量，有可能把这个控件的实现改得跟原先完全不一样，我们来看一个简单的代码：

[http://jsbin.com/homas/4](http://jsbin.com/homas/4)

怎么样，是不是很简单？

因为像Accordion这类控件，内部的逻辑无非是对数组的增删改，使用AngularJS的双向绑定机制，可以极大简化低级的DOM操作，直接用清晰的逻辑把整个业务表达出来，然后给UI充分的自由度。

类似，TabNavigator这个实现选项卡的功能，也可以用一样的方式实现，甚至它的模型跟Accordion都是一样的。看我们的改写：

[http://jsbin.com/homas/2](http://jsbin.com/homas/2)

怎样，我们就直接用着Accordion的模型，搞了完全不同的另外一个东西出来，有了这样的方式，还要控件干什么？

对于这类控件而言，在MVVM框架下，封装成控件反而累赘，不如自由一些好。

### Pager

分页在很多管理系统中，真是一个很常见的东西。有些UI框架会把分页功能跟数据表格等控件捆绑，内置为它们的一个选项，这么做其实有不少缺点。

首先是增加了控件本身的逻辑复杂度，

其次是不灵活了。

那么

### ContextMenu

右键菜单是一个比较奇特的控件，因为它的实现方式不得不从DOM层面入手，而我们说过，在MVVM模式下，应尽量避免DOM操作。

怎么办呢？

我们可以把两种截然不同的东西分离出来，比如说，菜单本体，用数据绑定来实现，而用DOM事件来控制它的弹出和关闭过程：

```HTML
<ul class="dropdown-menu">
	<li ng-repeat-start="menu in menuArr" ng-if="menu.action">
		<a>{{menu.title}} {{aaa}}</a>
	</li>
	<li ng-repeat-end ng-if="!menu.action" class="divider"></li>
</ul>
```

```JavaScript
$http.get("templates/menu/menu.html").then(function(result) {
    var menu = angular.element(result.data);

    $compile(menu)(angular.extend($rootScope.$new(), {
        menuArr: scope.$eval(attrs["snContextmmenu"])
    }));

    element.on("contextmenu", function (evt) {
        if ($document.find("body")[0].contains(menu[0])) {
	        menu.css("display", "block");
        }
        else {
	        $document.find("body").append(menu);
        }

        //这里根据事件设置一下菜单位置
    });

    $document.on("click", function (evt) {
        menu.css("display", "none");
    });
});
```

### Tree

其实，树形结构是一个比较麻烦的东西，任何一个前端的MV*框架，都会希望你把数据模型尽量扁平化，避免过深的层次，而树恰好是反着来的，所以这就导致对树形数据的展现非常别扭。

有一些用AngularJS实现的树控件，使用了递归的数组绑定来实现，写起来确实是很简洁的，但效果不一定好，因为它的监控机制在这种场景下有较大的浪费，比如说，树节点的选中样式绑定到一个监控表达式，当很大数据量中一个节点被选中的时候，可能会要把所有的监控都跑一遍。当然这里的数据模型设计也是会有一些技巧的，比如，改在单个节点上存放选中状态，用于判定样式，会比依赖于控件级的selectedNode变量效率要高很多。个人观点，尽量还是避免递归的$compile。

那么，对于这类控件，有什么好办法吗？

我觉得React的Virtual DOM可能有助于处理这种场景。

### 图表库

以AngularJS为代表的MVVM框架，使我们能够远离烦琐的DOM操作，这一点在前面已经介绍过了。我们回想在业务中使用的不同控件，似乎还有一类没有覆盖到，那就是图表库。

传统的JavaScript图表库，有些是基于Canvas的，从实现机制上来说，无需依赖jQuery这样的DOM操作库，这类通常封装了自己的基础操作，自成一体，本身做得很优秀，典型的有百度的ECharts。如果想把它跟Angular这样的框架集成，一般来说在上面套一个directive的壳即可，在内部调用真正的实现。

注意到还有另外一些图表库，核心是适配了SVG或者VML实现的，比如说，基于Raphael.js做的图表控件。我们看一下Raphael的常见代码写法：

```JavaScript
for (var i = 0; i < 5; i++) {
  paper.circle(10 + 15 * i, 10, 10)
    .attr({fill: "#000"})
    .data("i", i)
    .click(function () {
      alert(this.data("i"));
    });
}
```

哎，这代码的样子怎么这么熟悉？像不像jQuery？因为使用SVG或者VML来显示图形，本质是跟DOM操作一样的，所以它也选用了像jQuery一样的代码方式。

我们大胆再想一步，普通的基于HTML元素的控件，我们不用jQuery了，而是通过绑定的方式，那图表库是不是也可以这样呢？

来尝试一下：

[http://jsbin.com/yokik/1](http://jsbin.com/yokik/1)

是不是很有意思？

这个例子本身很简单，用来代替成熟图表库的话，可以说差得非常远，但它说明了我们有可能用怎样的思路去实现图表库。

传统图表库的缺点是，整个视觉方面都只能由程序员控制，对视觉方面有经验的人只能给出配色和布局的建议，然后等程序员实现了之后，再回头来继续提出建议修改。

使用我们提到的这种方式，就把算法逻辑和界面展现分离得非常好，可以像写普通HTML界面那样，分别由不同的人员协作，然后组装在一起。

如果我们想要把同样的数据换一种图形来展示，也会非常容易，不需要改变模型，只要把视图层换掉，立刻完成。

比如这个例子，使用了同一个数据模型：

[http://xufei.github.io/ng-charts/index.html](xufei.github.io/ng-charts/index.html)

## 小结

我们回过头来想一想，控件的本质是什么？是特定数据结构的交互展现。会有哪些数据结构呢？总结起来，真的是很简单，因为常见的就这么几种：

- 简单值或者单个对象
- 数组
- 树

其他好像都没有了。

传统的控件，封装的主要逻辑是数据模型跟DOM之间的对应关系，而这种关系被AngularJS这种MVVM框架作为基础设施提供了，把代码重构之后，会惊奇地发现，控件的界面和逻辑分离得干干净净，我们可以复用这个逻辑，在不同的场景下把控件界面多样化，以此来面对不停变更的需求。

因此，在MVVM的时代，我们需要把控件库用与以往完全不同的方式来重新设计，去掉一些不再适合作为控件的，把其他的控件展现跟行为分离，让模型更精炼，给UI层更多的自由度，控件这个概念会淡化很多。

从这一点看，新的模式会对我们的HTML和CSS规划能力要求更高，因为之前在控件内部封装了DOM的处理，当需要整体调整的时候，有机会在控件这个层面去统一处理，但把控件界面分离并多样化之后，这部分压力就会转移到DOM和样式规划者手中。

随着时代的发展，浏览器特性的增强，我们有机会选用一些较新的实现技术，大幅简化或者完全改变之前的实现方式。