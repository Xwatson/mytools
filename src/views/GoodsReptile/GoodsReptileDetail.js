import React, {Component} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView  } from "react-native";
import Header from "../../components/Header";
import { Button, InputItem, List, Switch, Toast, Portal, TextareaItem } from '@ant-design/react-native';
import { Save, Update, getDetailById } from '../../service/goodsReptile';

const Status = {
    'ENABLE': true,
    'DISABLE': false
}
export default class GoodsReptileDetail extends React.Component {
    /* static navigationOptions = ({ navigation }) => ({
        title: '我是详情页'
    }) */
    state = {
        detail: {
            name: '', // 名称
            site_name: '', // 站点名称
            image_url: '', // 图片地址
            image_selector: '', // 图片选择器
            url: '', // 地址
            query_selector: '', // 价格document选择器
            vip_query_selector: '', // 会员价document选择器
            current_price: 0, // 现在价格
            vip_price: 0, // 会员价
            lowest_price: 0, // 最低价格
            expect_price: 0, // 期望价格
            lowest_price_time: null, // 最低价出现时间
            is_phone: true, // 是否移动端
            status: 'ENABLE', // 禁用/启用
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
    componentDidMount() {
        if (this.id) {
            this.getDetail(this.id);
        }
    }
    getDetail = async(id) => {
        const key = Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        try {
            const res = await getDetailById(id);
            Portal.remove(key);
            if (res.code === 0) {
                this.setState({
                    detail: res.data
                });
                this.verificationField(res.data);
            }
        } catch (error) {
            console.log('请求错误：' + error)
            Toast.fail('请求错误：' + error, 3);
        }
    }
    verificationField(detail = {}) {
        this.setState({
            verification: {
                name: !detail.name,
                site_name: !detail.site_name,
                image_selector: !detail.image_selector,
                url: !detail.url,
                query_selector: !detail.query_selector,
            }
        })
    }
    render() {
        const { detail = {}, verification } = this.state;
        return (
            <KeyboardAvoidingView  behavior="padding" style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} title={`${detail.name}`} leftButton />
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
                        <List.Item>
                            图片地址  <TextareaItem rows={4} placeholder="该值自动更新" value={detail.image_url} editable={false} autoHeight />
                        </List.Item>
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
                        <List.Item extra={detail.current_price + ''}>
                            现在价格
                        </List.Item>
                        <List.Item extra={detail.vip_price + ''}>
                            会员价
                        </List.Item>
                        <List.Item extra={detail.lowest_price + ''}>
                            最低价格
                        </List.Item>
                        <InputItem type="number" clear value={detail.expect_price}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, expect_price: parseFloat(value) },
                                });
                            }}
                            placeholder="请输入"
                        >
                            期望价格
                        </InputItem>
                        <List.Item extra={detail.lowest_price_time}>
                            最低价出现时间
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
                        <List.Item extra={<Switch checked={Status[detail.status]} trackColor={{true: "blue", false: null}}
                            onChange={value => {
                                this.setState({
                                    detail: { ...detail, status: value ? 'ENABLE' : 'DISABLE' },
                                });
                            }}
                            />}
                        >
                            禁用/启用
                        </List.Item>
                        <List.Item>
                            错误信息  <TextareaItem rows={4} placeholder="该值自动更新" value={detail.message} editable={false} autoHeight />
                        </List.Item>
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
            alert('请检查必填字段！');
            Toast.fail('请检查必填字段！', 3);
            return;
        }
        const key = Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        try {
            let res = null;
            let meg = '';
            if (this.id) {
                detail.id = this.id;
                res = await Update(detail);
                meg = '修改成功！';
            } else {
                res = await Save(detail);
                meg = '保存成功！';
            }
            Portal.remove(key);
            alert(meg);
            Toast.success(meg);
            this.props.navigation.goBack();
        } catch (error) {
            alert('操作失败：' + error);
            Toast.fail('操作失败：' + error);
        }
    }
}