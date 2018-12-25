import React, {Component} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView  } from "react-native";
import Header from "../../components/Header";
import { Button, InputItem, List, Switch, Toast, Portal } from '@ant-design/react-native';
import { Save } from '../../service/goodsReptileDetail'

export default class GoodsReptileDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: '我是详情页'
    })
    state = {
        detail: {
            name: '', // 名称
            site_name: '', // 站点名称
            image_url: '', // 图片地址
            image_selector: '', // 图片选择器
            url: '', // 地址
            query_selector: '', // 价格document选择器
            vip_query_selector: '', // 会员价document选择器
            current_price: '', // 现在价格
            vip_price: '', // 会员价
            lowest_price: '', // 最低价格
            expect_price: '', // 期望价格
            lowest_price_time: '', // 最低价出现时间
            is_phone: true, // 是否移动端
            replace_str: '', // 替换字符
            vip_replace_str: '', // vip价替换字符
            code: 0, // 查询错误码 0成功 1错误
            message: '', // 错误信息
        },
        verification: {
            name: true,
            site_name: true,
            image_selector: true,
            url: true,
            query_selector: true,
        }
    }
    constructor(props) {
        super(props);
        this.id = this.props.navigation.state.params.id;
    }
    render() {
        const { detail = {}, verification } = this.state;
        return (
            <KeyboardAvoidingView  behavior="padding" style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} title={`详情页${this.id}`} leftButton />
                <ScrollView >
                    <List renderHeader={'编辑'}>
                        <InputItem clear value={detail.name} error={verification.name}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, name: value },
                                    verification: { ...verification, name: !value }
                                });
                            }}
                            placeholder="请输入"
                        >
                            名称
                        </InputItem>
                        <InputItem clear value={detail.site_name} error={verification.site_name}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, site_name: value },
                                    verification: { ...verification, site_name: !value }
                                });
                            }}
                            placeholder="请输入"
                        >
                            站点名称
                        </InputItem>
                        <InputItem clear value={detail.image_url} disabled
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, image_url: value },
                                });
                            }}
                            placeholder="该值自动更新"
                        >
                            图片地址
                        </InputItem>
                        <InputItem clear value={detail.image_selector} labelNumber={5} error={verification.image_selector}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, image_selector: value },
                                    verification: { ...verification, image_selector: !value }
                                });
                            }}
                            placeholder="请输入"
                        >
                            图片选择器
                        </InputItem>
                        <InputItem clear value={detail.url} error={verification.url}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, url: value },
                                    verification: { ...verification, url: !value }
                                });
                            }}
                            placeholder="请输入"
                        >
                            商品地址
                        </InputItem>
                        <InputItem clear value={detail.query_selector} labelNumber={5} error={verification.query_selector}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, query_selector: value },
                                    verification: { ...verification, query_selector: !value }
                                });
                            }}
                            placeholder="请输入"
                        >
                            价格选择器
                        </InputItem>
                        <InputItem clear value={detail.vip_query_selector} labelNumber={6}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, vip_query_selector: value },
                                });
                            }}
                            placeholder="请输入"
                        >
                            会员价选择器
                        </InputItem>
                        <InputItem clear value={detail.current_price} disabled
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, current_price: value },
                                });
                            }}
                            placeholder="该值自动更新"
                        >
                            现在价格
                        </InputItem>
                        <InputItem clear value={detail.vip_price} disabled
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, vip_price: value },
                                });
                            }}
                            placeholder="该值自动更新"
                        >
                            会员价
                        </InputItem>
                        <InputItem clear value={detail.lowest_price} disabled
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, lowest_price: value },
                                });
                            }}
                            placeholder="该值自动更新"
                        >
                            最低价格
                        </InputItem>
                        <InputItem type="number" clear value={detail.expect_price}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, expect_price: value },
                                });
                            }}
                            placeholder="请输入"
                        >
                            期望价格
                        </InputItem>
                        <InputItem clear value={detail.lowest_price_time} labelNumber={7} disabled
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, lowest_price_time: value },
                                });
                            }}
                            placeholder="该值自动更新"
                        >
                            最低价出现时间
                        </InputItem>
                        <List.Item extra={<Switch checked={detail.is_phone} trackColor={{true: "blue", false: null}}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, is_phone: value },
                                });
                            }}
                            />}
                        >
                            是否移动端
                        </List.Item>
                        <InputItem clear value={detail.replace_str} labelNumber={6}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, replace_str: value },
                                });
                            }}
                            placeholder="请输入"
                        >
                            价格替换字符
                        </InputItem>
                        <InputItem clear value={detail.vip_replace_str} labelNumber={7}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, vip_replace_str: value },
                                });
                            }}
                            placeholder="请输入"
                        >
                            vip价替换字符
                        </InputItem>
                        <InputItem clear value={detail.message} disabled
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, message: value },
                                });
                            }}
                            placeholder="无"
                        >
                            错误信息
                        </InputItem>
                        <List.Item>
                            <Button type="warning" onPress={this.onSave}>
                                保存
                            </Button>
                        </List.Item>
                    </List>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    onSave = async() => {
        const { detail = {}, verification } = this.state;
        if (verification.name || verification.site_name || verification.image_selector || verification.url || verification.query_selector) {
            Toast.fail('请检查必填字段！', 3);
            return;
        }
        if (this.id) {
            detail.id = this.id;
        }
        
        const key = Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        const data = await Save(detail);
        Portal.remove(key)
        if (data) {
            alert('保存成功！');
            this.props.navigation.goBack();
        } else {
            alert('保存失败！');
        }
    }
}