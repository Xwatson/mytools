import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Feather";
import { List, Tag } from '@ant-design/react-native';
import { observer, inject } from "mobx-react";
import goodsReptileStore from "../../store/GoodsReptileStore";

const Item = List.Item;
const Brief = Item.Brief;

@observer
export default class GoodsReptileList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '爬虫'
    })
    constructor(props) {
        super(props);
        this.goodsReptileStore = new goodsReptileStore();
        this.page = 1;
        this.size = 20;
        this.data = [
            {
                id: 1,
                name: '商品名称aaaa', // 商品名称
                site_name: '天猫', // 站点名称
                image_url: '', // 图片地址
                current_price: 21, // 当前价格
                vip_price: 19, // 会员价
                lowest_price: 19, // 最低价
                expect_price: 10, // 期望价
                code: 0
            },
            {
                id: 2,
                name: '商品名称bbbb', // 商品名称
                site_name: '京东', // 站点名称
                image_url: '', // 图片地址
                current_price: 98, // 当前价格
                vip_price: 98, // 会员价
                lowest_price: 98, // 最低价
                expect_price: 78, // 期望价
                code: 1
            }
        ]
        
    }
    componentDidMount() {
        this.getList({ page: this.page, size: this.size })
    }
    getList = (q = {}) => {
        this.goodsReptileStore.getList(q);
    }
    renderListItem = (data = []) => {
        if (data.length) {
            return data.map(item => 
                <Item key={item.id} thumb={item.image_url || 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}
                    arrow="horizontal"
                    multipleLine
                    onClick={() => this.props.navigation.navigate('GoodsReptileDetail', {id: item.id})}
                >
                    {item.name}
                    <View style={styles.listItemBrief}>
                        <View style={[styles.listItemBriefBox, styles.listItemBriefSite]}><Text style={{ color: '#fff' }}>{item.site_name}</Text></View>
                        {this.getPriceStatusIcon(item)}
                        {
                            item.vip_price ?
                                <View style={[styles.listItemBriefBox, styles.listItemBriefVipPrice]}><Text style={{color: '#e4c06a'}}>vip:{item.vip_price}</Text></View>
                                : null
                        }
                        <View style={[styles.listItemBriefBox, styles.listItemBriefExpectPrice]}><Text style={{color: '#090'}}>期望:{item.expect_price}</Text></View>
                        <View style={[styles.listItemBriefBox, styles.listItemBriefLowestPrice]}><Text style={{color: 'red'}}>最低:{item.lowest_price}</Text></View>
                        {
                            item.code ? 
                                <View style={[styles.listItemBriefBox, styles.listItemBriefCode]}><Text style={{color: '#fff'}}>Error</Text></View> :
                                null
                        }
                    </View>
                </Item>
            )
        } else {
            return <Text style={{ textAlign: 'center' }}>暂无数据</Text>
        }
    }
    getPriceStatusIcon = (item = {}) => {
        return (
            <View style={[styles.listItemBriefBox, styles.listItemBriefCurrPrice]}>
                {
                    item.current_price > item.expect_price ?
                        <Text style={{ color: '#f54545' }}>{item.current_price}<Icon name={'arrow-up'} size={10} color={'#f54545'} /></Text>:
                        <Text style={{ color: '#090' }}>{item.current_price}<Icon name={'arrow-down'} size={10} color={'#090'} /></Text>
                }
            </View>
        )
    }
    render() {
        const { list = {} } = this.goodsReptileStore
        return (
            <View style={{ flex: 1 }}>
                <Header title={'商品爬虫'} rightButton={true} />
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#f5f5f9' }} >
                    <List renderHeader={'basic'}>
                        {this.renderListItem(list.rows)}
                    </List>
                </ScrollView>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    listItemBrief: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemBriefBox: {
        paddingHorizontal: 2,
        paddingVertical: 1,
        marginHorizontal: 2,
        marginVertical: 0,
        fontSize: 12,
        borderRadius: 3,
    },
    listItemBriefSite: {
        marginLeft: 0,
        color: '#fff',
        backgroundColor: '#f54545',
    },
    listItemBriefCurrPrice: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#feb115',
    },
    listItemBriefVipPrice: {
        color: '#e4c06a',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e4c06a',
    },
    listItemBriefExpectPrice: {
        color: '#090',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#090',
    },
    listItemBriefLowestPrice: {
        color: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
    },
    listItemBriefCode: {
        color: '#fff',
        fontWeight:'bold',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e4393c',
        backgroundColor: '#e4393c',
    },
})