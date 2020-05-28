
/* ================px/em/rem=============== */
// 1 、px
// px就是pixel（像素）的缩写，相对长度单位，相对于屏幕分辨率。

// 2、em

// 参考物是父元素的font-size，具有继承的特点。浏览器默认字体是16px，整个页面内1em不是一个固定的值。
// 字体大小同样都是1.5em，但是效果却截然不同，按照W3C提供的公式，我们可以计算下： class为id1的div字体大小继承自父元素body：16px*1.5em = 24px class为id2的div字体大小继承自父元素id1：24px*1.5em = 36px class为id3的div字体大小继承自父元素id2：36px*1.5em = 54px

// 3、rem
// rem是CSS3新增的一个相对单位，但相对的只是HTML根元素。通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

// 居中

/* ================盒模型=============== */

// 盒模型 ， box-sizing
// 1. W3C 标准盒模型：
// 属性width,height只包含内容content，不包含border和padding。
// 2. IE 盒模型：
// 属性width,height包含border和padding，指的是content+padding+border。

// box-sizing
// content-box(W3C标准盒模型)  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，
// 并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
// border-box(IE 盒模型) 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。
// 也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，
// 内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

/* ================垂直居中=============== */
// 1、transform
// 2、absolute
// 3、flex

