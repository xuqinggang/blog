## 实例讲解react组件重构与优化

1. 实例一:
需求：列表页，并具有滚动加载的功能。直接看下下面组件的实现

```js
// RentUnitList.js
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
上面组件，有了列表页展示，并具备了滚动加载功能。但如果此时我们有另外一个需求，也是列表页也具备滚动加载功能。那么此时我们就要再写一个类似的组件实现了，但这是完全没有必要的。上面组件把列表页展示和滚动加载功能耦合在一起了，如果把滚动加载功能提取出，变成可复用的，那就只需要写不同的列表展示页组件了。

此时就可以利用高阶组件来重构该组件了。请看下面组件的实现:
```js
// WindowScrollLoadConnect.js
// 添加了flow做类型检查
type PropType = {
    onScroll: Function,
    // 滚动到底部触发的回调函数
    onScrollBottom: Function,
    // 预留距离，距离底部还剩改距离时候，则触发onScrollBottom
    reserveSize: number,
};
// 滚动加载高阶组件的实现
export default function WindowScrollLoadConnectFunc() {
    return function WindowScrollLoadConnectDecorators(WrappedCom: React$ComponentType<*>) {
        return class WindowScrollLoadConnect extends PureComponent<PropType> {
            static defaultProps = {
                onScrollBottom: emptyFunc,
                onScroll: emptyFunc,
                reserveSize: 200,
            };

            lastScrollTop: number = 0;

            handleScroll = () => {
                const {
                    onScrollBottom,
                    onScroll,
                    reserveSize,
                } = this.props;
                onScroll();

                const docHeight = getDocHeight();
                const scrollTop = getScrollTop();

                if (scrollTop > this.lastScrollTop) {
                    if ((docHeight - window.innerHeight - scrollTop) <= reserveSize) {
                        onScrollBottom();
                    }
                }

                this.lastScrollTop = scrollTop;
            }

            componentDidMount() {
                window.addEventListener('scroll', this.handleScroll);
            }

            componentWillUnmount() {
                window.removeEventListener('scroll', this.handleScroll);
            }

            render() {
                const {
                    onScrollBottom,
                    onScroll,
                    reserveSize,
                    ...extraProps
                } = this.props;

                return <WrappedCom {...extraProps} />;
            }
        };
    };
}

// RentUnitList.js 
// 只是单纯的列表展示，已去掉滚动加载功能
type PropType = {
    list: [rentUnitItemType],
    isLoading?: boolean,
};

class RentUnitList extends PureComponent<PropType> {
    render() {
        const {
            list,
            isLoading,
            urlNavigate,
        } = this.props;

        return (
            <div className={clsPrefix}>
                {
                    list.map((rentalUnit, index) => (
                        <RentUnitItem
                            {...rentalUnit}
                            key={index}
                            urlNavigate={urlNavigate}
                        />
                    ))
                }
                {
                    isLoading ?
                        <RentUnitPlaceHolder />
                        : null
                }
            </div>
        );
    }
}
// 为了让列表具备加载功能,只需要用具备滚动加载功能的高阶组件来装饰一下
@WindowScrollLoadConnect()
export default RentUnitList;
```

### 总结
> 1. 利用高阶组件，把可以复用的逻辑功能提取出来，以便简化组件的实现，提取出来的高阶组件亦可以复用
