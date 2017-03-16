import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Animated,
	View,
	PanResponder
} from 'react-native';


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'gray'
	},
	slide: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});


/**
 * 2D Swiper
 */
export default class Swiper extends Component {

	position = new Animated.Value(0);
	positionValue = 0;

	constructor(props) {
		super(props);
		this.position.addListener(v => {
			this.positionValue = v.value;
		});
	}

	state = {
		width: null
	};

	responder = PanResponder.create({
		// 要求成为响应者：
		onStartShouldSetPanResponder: (evt, gestureState) => false,
		onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
		onMoveShouldSetPanResponder: (evt, gestureState) => true,
		onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
		onShouldBlockNativeResponder: (evt, gestureState) => {
			// 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
			// 默认返回true。目前暂时只支持android。
			return true;
		},
		onPanResponderTerminationRequest: (evt, gestureState) => false,
		onPanResponderGrant: (evt, gestureState) => {
	        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
	        // gestureState.{x,y}0 现在会被设置为0
	        this.position.setOffset(this.positionValue);
	        this.position.setValue(0);
		},
		onPanResponderMove: (evt, gestureState) => {
	        // 最近一次的移动距离为gestureState.move{X,Y}
	        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
	        this.position.setValue(gestureState.dx / -this.state.width);
		},
		// 下面这两段代码等效
		// onPanResponderMove: Animated.event([
		// 	null, {dx: this.value}
		// ]),
		// onPanResponderMove: (evt, {dx}) => {
		// 	this.value.setValue(dx);
		// },
		onPanResponderRelease: (evt, {vx}) => {
			// 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        	// 一般来说这意味着一个手势操作已经成功完成。
        	this.position.flattenOffset();
        	const childrenCount = React.Children.count(this.props.children);
        	const left = Math.max(0, Math.floor(this.positionValue));
        	const right = Math.min(childrenCount - 1, left + 1);
        	console.log(left, right);
        	let reuslt;
        	// 判断滑动的速度
        	if (vx > 0.05) {
        		result = left;
        	} else if (vx < -0.05) {
        		result = right;
        	} else {
        		result = Math.round(this.positionValue);
        	}
        	Animated.spring(this.position, {
    			toValue: result
    		}).start();
		}
	})

	onContainerLayout = (e) => {
		const {
			width
		} = e.nativeEvent.layout;
		this.setState({
			width
		});
	};

	render() {
		const {
			style,
			children
		} = this.props;
		const {
			width
		} = this.state;

		if (!width) {
			return <View style={[styles.container, style]} onLayout={this.onContainerLayout} />
		}

		return (
			<View
				style={[styles.container, style]}
				{...this.responder.panHandlers}
				onLayout={this.onContainerLayout}>
				{
					React.Children.map(children, (child, i) => {
						return (
							<Animated.View key={i} style={[styles.slide, {
								transform: [
									{
										translateX: this.position.interpolate({
											inputRange: [i, i + 1],
											outputRange: [0, -width]
										})
									}
								]
							}]}>
								{child}
							</Animated.View>
						)
					})
				}
			</View>
		)
	}
}