'use strict';

(function ($, React, ReactRouter, Reflux) {
	//使用refulx实现组件通信
	// 第一步 创建分类的消息对象
	var LayerAction = Reflux.createActions(['controlLayer']);
	// 第二步 创建store，存储数据
	var LayerStore = Reflux.createStore({
		// 绑定消息对象
		listenables: [LayerAction],
		// 定义LayerAction中每一个消息的回调函数
		onControlLayer: function onControlLayer(data) {

			this.trigger(data);
		}
	});
	//定义Layer组件
	var Layer = React.createClass({
		displayName: 'Layer',

		mixins: [Reflux.connect(LayerStore, 'data')],
		getInitialState: function getInitialState() {
			return {
				data: {
					//用于登陆注册选项卡切换
					display: true,
					//用于显隐Layer
					layerDisplay: false
				}
			};
		},
		clickLogin: function clickLogin(e) {
			this.setState({
				data: {
					display: false,
					layerDisplay: true
				}
			});
		},
		clickRegist: function clickRegist() {
			this.setState({
				data: {
					display: true,
					layerDisplay: true
				}
			});
		},
		clickCloseLayer: function clickCloseLayer() {
			this.setState({
				data: {
					display: true,
					layerDisplay: false
				}
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'layer', style: { display: this.state.data.layerDisplay ? 'block' : 'none' } },
				React.createElement(
					'div',
					{ className: 'layer-box', style: { height: this.state.data.display ? '468px' : '340px' } },
					React.createElement(
						'div',
						{ className: 'dialog-header' },
						React.createElement('a', { href: '', className: 'go-home' }),
						React.createElement(
							'a',
							{ href: 'javascript:void(0);', className: "tab goto-login " + (this.state.data.display ? "" : "selected"), onClick: this.clickLogin, ref: 'loginBtn' },
							'登录'
						),
						React.createElement(
							'a',
							{ href: 'javascript:void(0);', className: "tab goto-login " + (this.state.data.display ? "selected" : ""), onClick: this.clickRegist, ref: 'registBtn' },
							'注册'
						),
						React.createElement('span', { className: 'close-layer', onClick: this.clickCloseLayer })
					),
					React.createElement(
						'div',
						{ className: 'dialog-content' },
						React.createElement(
							'div',
							{ className: 'dialog-cot dialog-cot-login', style: { display: this.state.data.display ? 'none' : 'block' } },
							React.createElement(
								'div',
								{ className: 'dialog-input-box clearfix' },
								React.createElement('span', { className: 'phone' }),
								React.createElement('input', { type: 'text', placeholder: '手机号' })
							),
							React.createElement(
								'div',
								{ className: 'dialog-input-box clearfix' },
								React.createElement('span', { className: 'keys' }),
								React.createElement('input', { type: 'text', placeholder: '密码' })
							),
							React.createElement(
								'p',
								null,
								React.createElement(
									'a',
									{ href: '' },
									'忘记密码?'
								)
							),
							React.createElement(
								'button',
								null,
								'立即登录'
							),
							React.createElement(
								'div',
								{ className: 'other-ways' },
								React.createElement(
									'span',
									null,
									'其它方式登录'
								),
								React.createElement('a', { href: '', className: 'qq' }),
								React.createElement('a', { href: '', className: 'weix' }),
								React.createElement('a', { href: '', className: 'xinla' })
							)
						),
						React.createElement(
							'div',
							{ className: 'dialog-cot lialog-cot-regist', style: { display: this.state.data.display ? 'block' : 'none' } },
							React.createElement(
								'div',
								{ className: 'dialog-input-box clearfix' },
								React.createElement('span', { className: 'phone' }),
								React.createElement('input', { type: 'text', placeholder: '手机号' })
							),
							React.createElement(
								'div',
								{ className: 'dialog-input-box clearfix' },
								React.createElement('span', { className: 'ear' }),
								React.createElement('input', { type: 'text', placeholder: '验证码' })
							),
							React.createElement(
								'p',
								null,
								'请留意12590开头的号码，接听验证码'
							),
							React.createElement(
								'div',
								{ className: 'dialog-input-box clearfix' },
								React.createElement('span', { className: 'user' }),
								React.createElement('input', { type: 'text', placeholder: '昵称' })
							),
							React.createElement(
								'div',
								{ className: 'dialog-input-box clearfix' },
								React.createElement('span', { className: 'keys' }),
								React.createElement('input', { type: 'text', placeholder: '密码' })
							),
							React.createElement(
								'p',
								null,
								React.createElement(
									'a',
									{ href: '' },
									React.createElement('i', { className: 'gou' }),
									'熊猫直播服务条款'
								)
							),
							React.createElement(
								'button',
								null,
								'注册'
							)
						)
					),
					React.createElement('div', { className: 'dialog-footer' })
				)
			);
		}
	});
	//定义Navlist组件  Nav组件的子组件
	var Navlist = React.createClass({
		displayName: 'Navlist',

		createLi: function createLi(arr) {
			return arr.map(function (obj, index) {
				return React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'a',
						{ href: "#/all/" + obj.site },
						obj.name
					)
				);
			});
		},
		createUl: function createUl() {
			var me = this;
			return this.props.data.map(function (obj, index) {
				return React.createElement(
					'div',
					{ key: index, className: 'ul-list' },
					React.createElement(
						'h4',
						null,
						obj.title
					),
					React.createElement(
						'ul',
						{ className: 'clearfix' },
						me.createLi(obj.item)
					)
				);
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				this.createUl(),
				React.createElement(
					'div',
					{ className: 'nav-bottom' },
					React.createElement(
						'a',
						{ href: '' },
						'直播指导'
					),
					React.createElement(
						'a',
						{ href: '' },
						'客服支持'
					),
					React.createElement(
						'a',
						{ href: '' },
						'问题反馈'
					)
				)
			);
		}
	});
	//定义Nav组件
	var Nav = React.createClass({
		displayName: 'Nav',

		//初始化状态
		getInitialState: function getInitialState() {
			return {
				data: []
			};
		},
		//鼠标在box滚动滚轮事件回调函数
		boxScroll: function boxScroll(e) {
			e.preventDefault();
			//低版本只能这么访问，高版本用this.refs.box
			//console.log(this.refs.box.getDOMNode())
			var box = $(this.refs.box.getDOMNode());
			var boxContent = $(this.refs.boxContent.getDOMNode());
			var sliderBtn = $(this.refs.sliderBtn.getDOMNode());
			var maxTop = boxContent.height() - box.height();
			//滚轮滚动比例系数
			var xishu = 30 / maxTop;
			console.log(xishu);
			var top = boxContent.position().top;
			var sliderTop = sliderBtn.position().top;
			if (e.deltaY > 0) {
				//当滑轮向下滚动时 
				if (top <= -maxTop) {
					top = -maxTop;
					return;
				}

				$(boxContent).css({ 'top': top -= 30 });
				$(sliderBtn).css({ 'top': sliderTop += xishu * 230 });
			}
			if (e.deltaY < 0) {
				//当滑轮向上滚动时 
				if (top >= 0) {
					top = 0;
					return;
				}
				$(boxContent).css({ 'top': top += 30 });
				$(sliderBtn).css({ 'top': sliderTop -= xishu * 230 });
			}
		},
		//搜索框焦点事件
		blur: function blur(e) {
			e.target.value = '搜游戏/主播';
		},
		focus: function focus(e) {
			e.target.value = '';
		},
		//点击登录事件回调
		showLayerLogin: function showLayerLogin() {
			var data = {
				//用于登陆注册选项卡切换
				display: false,
				//用于显隐Layer
				layerDisplay: true
			};
			LayerAction.controlLayer(data);
		},
		//点击注册事件回调
		showLayerRegist: function showLayerRegist() {
			var data = {
				//用于登陆注册选项卡切换
				display: true,
				//用于显隐Layer
				layerDisplay: true
			};
			LayerAction.controlLayer(data);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'nav' },
				React.createElement(
					'div',
					{ className: 'form' },
					React.createElement('img', { src: 'img/logo.png', alt: '' }),
					React.createElement(
						'form',
						{ action: '' },
						React.createElement('input', { className: 'search', type: 'text', defaultValue: '搜游戏/主播', onFocus: this.focus, onBlur: this.blur }),
						React.createElement('input', { className: 'submit', type: 'submit', value: '' })
					)
				),
				React.createElement(
					'div',
					{ className: 'tit' },
					React.createElement(
						'a',
						{ href: '#/all/00' },
						'全部'
					),
					React.createElement(
						'a',
						{ href: '#/' },
						'分类'
					),
					React.createElement(
						'a',
						{ href: '#/type' },
						'主播地图'
					)
				),
				React.createElement(
					'div',
					{ ref: 'box', className: 'box', onWheel: this.boxScroll },
					React.createElement(
						'span',
						{ ref: 'slider', className: 'slider' },
						React.createElement('span', { ref: 'sliderBtn', className: 'slider-btn' })
					),
					React.createElement(
						'div',
						{ ref: 'boxContent', className: 'box-content' },
						React.createElement(
							'button',
							null,
							'一屏多看'
						),
						React.createElement(Navlist, { data: this.state.data })
					)
				),
				React.createElement(
					'div',
					{ className: 'nav-login' },
					React.createElement(
						'button',
						{ className: 'go-login', onClick: this.showLayerLogin },
						'登录'
					),
					React.createElement(
						'button',
						{ className: 'go-regist', onClick: this.showLayerRegist },
						'注册'
					)
				)
			);
		},
		componentDidMount: function componentDidMount() {
			var me = this;
			$.get('data/navlist.json', function (res) {
				if (res && res.errno === 0) {
					me.setState({
						data: res.data
					});
				}
			});
		}
	});
	//定义TypeList组件 Home页的子组件
	var TypeList = React.createClass({
		displayName: 'TypeList',

		//创建Li的方法
		createLi: function createLi() {
			return this.props.data.map(function (obj, index) {
				return React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'a',
						{ href: "#/all/" + obj.site },
						React.createElement('img', { src: "img/type/" + obj.src, alt: '' }),
						React.createElement(
							'p',
							null,
							obj.name
						)
					)
				);
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'type-list' },
				React.createElement(
					'ul',
					{ className: 'clearfix' },
					this.createLi()
				)
			);
		}
	});
	//定义Home组件
	var Home = React.createClass({
		displayName: 'Home',

		//初始化状态
		getInitialState: function getInitialState() {
			return {
				data: []
			};
		},
		//点击分类项事件函数
		changeType: function changeType(v) {
			var me = this;
			//根据点击的分类更新Home组件的state.data
			var data = v ? this.state.keepData.filter(function (obj) {
				return obj.type === v;
			}) : this.state.keepData;
			this.setState({
				data: data
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'home' },
				React.createElement(
					'div',
					{ className: 'title' },
					React.createElement(
						'h1',
						null,
						'全部分类'
					),
					React.createElement(
						'ul',
						{ className: 'type-tit clearfix' },
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ onClick: this.changeType.bind(this, '') },
								'全部'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ onClick: this.changeType.bind(this, '1') },
								'热门竞技'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ onClick: this.changeType.bind(this, '2') },
								'娱乐联盟'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ onClick: this.changeType.bind(this, '3') },
								'主机单机'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ onClick: this.changeType.bind(this, '4') },
								'网游专区'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ onClick: this.changeType.bind(this, '5') },
								'手游专区'
							)
						)
					)
				),
				React.createElement(TypeList, { data: this.state.data })
			);
		},
		componentDidMount: function componentDidMount() {
			var me = this;
			//每次切换到Home页面，Home页面创建完成都会发送请求
			$.get('data/type.json', function (res) {
				if (res && res.errno === 0) {
					me.setState({
						data: res.data,
						keepData: res.data
					});
				}
			});
		}
	});
	//定义All组件
	var All = React.createClass({
		displayName: 'All',

		//初始化状态
		getInitialState: function getInitialState() {
			return {
				data: {
					content: []
				}
			};
		},
		createLi: function createLi() {
			var me = this;
			return this.state.data.content.map(function (obj, index) {
				return React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'a',
						{ href: "#/room/" + obj.site },
						React.createElement('img', { src: "img/all/all_" + me.props.num + "/" + obj.src, alt: '' }),
						React.createElement(
							'div',
							{ className: 'img-layer' },
							React.createElement('div', { className: 'img-layer-play' })
						),
						React.createElement(
							'div',
							null,
							React.createElement(
								'p',
								null,
								obj.name
							),
							React.createElement(
								'div',
								{ className: 'list-bottom' },
								React.createElement(
									'span',
									{ className: 'auther' },
									obj.auther
								),
								React.createElement(
									'span',
									{ className: 'eyes' },
									obj.people
								)
							)
						)
					)
				);
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'all' },
				React.createElement(
					'h1',
					null,
					this.state.data.type
				),
				React.createElement('div', { className: 'line' }),
				React.createElement(
					'ul',
					null,
					this.createLi()
				)
			);
		},
		componentDidMount: function componentDidMount() {
			var me = this;
			//每次切换到All页面，All页面创建完成都会发送请求
			$.get('data/all_' + this.props.num + '.json', function (res) {
				if (res && res.errno === 0) {
					me.setState({
						data: res.data
					});
				}
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			console.log(99999);
			var me = this;
			//如果All组件已经创建，每次父组件传过来的不同的num,All组件的this.props.num也就变了，这时候All组件进入了存在期，创建期不会再发送请求了，所以只能在存在期发送请求，选择在componentWillReceiveProps更新state
			$.get('data/all_' + nextProps.num + '.json', function (res) {
				if (res && res.errno === 0) {
					me.setState({
						data: res.data
					});
				}
			});
		},
		componentDidUpdate: function componentDidUpdate() {}

	});
	//定义Type组件
	var Type = React.createClass({
		displayName: 'Type',

		render: function render() {
			return React.createElement(
				'div',
				null,
				'Type'
			);
		}
	});
	//定义Search组件
	var Search = React.createClass({
		displayName: 'Search',

		render: function render() {
			return React.createElement(
				'div',
				{ style: { marginLeft: "230px" } },
				this.props.num
			);
		}
	});
	//定义App组件
	var App = React.createClass({
		displayName: 'App',

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'clearfix' },
				React.createElement(
					Nav,
					null,
					'导航'
				),
				React.createElement(
					Layer,
					null,
					'登录注册层'
				),
				React.createElement(ReactRouter.RouteHandler, { num: this.props.params.params.query })
			);
		}
	});
	//创建路由组件
	var Route = React.createFactory(ReactRouter.Route);
	var DefaultRoute = React.createFactory(ReactRouter.DefaultRoute);
	//定义规则 路由绑定对应组件
	var routes = React.createElement(
		Route,
		{ path: '/', handler: App },
		React.createElement(Route, { path: '/search/:query', handler: Search }),
		React.createElement(Route, { path: '/all/:query', handler: All }),
		React.createElement(Route, { path: '/type', handler: Type }),
		React.createElement(DefaultRoute, { handler: Home })
	);
	//启动路由
	ReactRouter.run(routes, function (Handler, params) {
		React.render(React.createElement(Handler, { params: params }), document.getElementById('app'));
	});
})(jQuery, React, ReactRouter, Reflux);
/*左侧导航栏的分类列表*/ /*定义路由容器*/