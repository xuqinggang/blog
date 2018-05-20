## 实例讲解react组件重构与优化

1. 实例一:
需求：列表页，并具有滚动加载的功能。直接看下下面组件的实现

```js
export default class RentUnitList extends Component {
    constructor(props) {
        super(props);
        this.lastScrollTop = 0;
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleLoadMore);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleLoadMore);
    }
    handleLoadMore = () => {
        const reserveSize = 200;
        const scrollTop = getScrollTop();
        if (scrollTop > this.lastScrollTop) {
            // 向下滚动
            if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                const { curPage, totalPage } = this.props.pager;
                if (curPage < totalPage) {
                    this.props.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }
    render() {
        return (
            <div className={clsPrefix}>
                {
                    this.props.list.map((rentalUnit, index) => (
                        <RentUnitItem key={index} {...rentalUnit} />
                    ))
                }
                {
                    this.props.loading
                    ? <RentUnitPlaceHolder />
                    : null
                }
            </div>
        );
    }
}
```
上面组件，有了列表页展示，并具备了滚动加载功能。但如果此时我们有另外一个需求，也是列表页也具备滚动加载功能
