'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScroll = function (_Component) {
    _inherits(InfiniteScroll, _Component);

    function InfiniteScroll(props) {
        _classCallCheck(this, InfiniteScroll);

        var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

        _this.scrollListener = _this.scrollListener.bind(_this);
        return _this;
    }

    _createClass(InfiniteScroll, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.pageLoaded = this.props.pageStart;
            this.attachScrollListener();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.attachScrollListener();
        }
    }, {
        key: 'getParentElement',
        value: function getParentElement(el) {
            return el.parentNode;
        }
    }, {
        key: 'filterProps',
        value: function filterProps(props) {
            return props;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var renderProps = this.filterProps(this.props);

            var children = renderProps.children,
                element = renderProps.element,
                hasMore = renderProps.hasMore,
                initialLoad = renderProps.initialLoad,
                isReverse = renderProps.isReverse,
                loader = renderProps.loader,
                loadMore = renderProps.loadMore,
                pageStart = renderProps.pageStart,
                threshold = renderProps.threshold,
                useCapture = renderProps.useCapture,
                useWindow = renderProps.useWindow,
                props = _objectWithoutProperties(renderProps, ['children', 'element', 'hasMore', 'initialLoad', 'isReverse', 'loader', 'loadMore', 'pageStart', 'threshold', 'useCapture', 'useWindow']);

            props.ref = function (node) {
                _this2.scrollComponent = node;
            };

            return _react2.default.createElement(element, props, children, hasMore && (loader || this._defaultLoader));
        }
    }, {
        key: 'calculateTopPosition',
        value: function calculateTopPosition(el) {
            if (!el) {
                return 0;
            }
            return el.offsetTop + this.calculateTopPosition(el.offsetParent);
        }
    }, {
        key: 'scrollListener',
        value: function scrollListener() {
            var el = this.scrollComponent;
            var scrollEl = window;
            var parentNode = this.getParentElement(el);

            var offset = void 0;
            if (this.props.useWindow) {
                var scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                if (this.props.isReverse) offset = scrollTop;else offset = this.calculateTopPosition(el) + el.offsetHeight - scrollTop - window.innerHeight;
            } else {
                if (this.props.isReverse) offset = parentNode.scrollTop;else offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
            }

            // Here we make sure the element is visible as well as checking the offset
            if (offset < Number(this.props.threshold) && el.offsetParent !== null) {
                this.detachScrollListener();
                // Call loadMore after detachScrollListener to allow for non-async loadMore functions
                if (typeof this.props.loadMore == 'function') {
                    this.props.loadMore(this.pageLoaded += 1);
                }
            }
        }
    }, {
        key: 'attachScrollListener',
        value: function attachScrollListener() {
            if (!this.props.hasMore || !this.getParentElement(this.scrollComponent)) {
                return;
            }

            var scrollEl = window;
            if (this.props.useWindow == false) {
                scrollEl = this.getParentElement(this.scrollComponent);
            }

            scrollEl.addEventListener('scroll', this.scrollListener, this.props.useCapture);
            scrollEl.addEventListener('resize', this.scrollListener, this.props.useCapture);

            if (this.props.initialLoad) {
                this.scrollListener();
            }
        }
    }, {
        key: 'detachScrollListener',
        value: function detachScrollListener() {
            var scrollEl = window;
            if (this.props.useWindow == false) {
                scrollEl = this.getParentElement(this.scrollComponent);
            }

            scrollEl.removeEventListener('scroll', this.scrollListener, this.props.useCapture);
            scrollEl.removeEventListener('resize', this.scrollListener, this.props.useCapture);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachScrollListener();
        }

        // Set a defaut loader for all your `InfiniteScroll` components

    }, {
        key: 'setDefaultLoader',
        value: function setDefaultLoader(loader) {
            this._defaultLoader = loader;
        }
    }]);

    return InfiniteScroll;
}(_react.Component);

InfiniteScroll.propTypes = {
    element: _react.PropTypes.string,
    hasMore: _react.PropTypes.bool,
    initialLoad: _react.PropTypes.bool,
    isReverse: _react.PropTypes.bool,
    loadMore: _react.PropTypes.func.isRequired,
    pageStart: _react.PropTypes.number,
    threshold: _react.PropTypes.number,
    useCapture: _react.PropTypes.bool,
    useWindow: _react.PropTypes.bool
};
InfiniteScroll.defaultProps = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    pageStart: 0,
    threshold: 250,
    useWindow: true,
    isReverse: false,
    useCapture: false
};
exports.default = InfiniteScroll;
module.exports = exports['default'];
