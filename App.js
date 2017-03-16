import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';
import Swiper from './Swiper';
import Swiper3D from './Swiper3D';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    title: {
        fontSize: 18,
        paddingVertical: 10,
        alignSelf: 'center'
    },
    swiper: {
        height: 180
    },
    slide: {
        flex: 1
    },
    slideText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 46
    }
});



export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}> Normal Swiper Demo </Text>

                    <Swiper style={styles.swiper}>
                        <Image style={styles.slide} source={require('./img/1.jpg')}/>
                        <Image style={styles.slide} source={require('./img/2.jpg')}/>
                        <Image style={styles.slide} source={require('./img/3.jpg')}/>
                        <Image style={styles.slide} source={require('./img/4.jpg')}/>
                        {/*
                        <View style={[styles.slide, {backgroundColor: '#ff6666'}]}>
                            <Text style={styles.slideText}> 我是第一页 </Text>
                        </View>
                        <View style={[styles.slide, {backgroundColor: '#33cc66'}]}>
                            <Text style={styles.slideText}> 我是第二页 </Text>
                        </View>
                        <View style={[styles.slide, {backgroundColor: '#00ccff'}]}>
                            <Text style={styles.slideText}> 我是第三页 </Text>
                        </View>
                        */}
                    </Swiper>
                </View>

                <View>
                    <Text style={styles.title}> 3D Swiper Demo </Text>
                    <Swiper3D style={styles.swiper}>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/1.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/2.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/3.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/4.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/1.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/2.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/3.jpg')}/>
                        <Image style={[styles.slide, {width:375}]} source={require('./img/4.jpg')}/>
                    </Swiper3D>
                </View>
            </View>
        );
    }
}
