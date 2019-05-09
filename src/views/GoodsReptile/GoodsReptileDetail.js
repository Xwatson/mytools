import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
// import Header from "../../components/Header";
import { Header, Input, ListItem, Button } from 'react-native-elements';
import { Save, Update, getDetailById } from '../../service/goodsReptile';
import moment from 'moment'

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
    allVerification: false,
    verification: {
      name: false,
      site_name: false,
      image_selector: false,
      url: false,
      query_selector: false,
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
  getDetail = async (id) => {
    try {
      const res = await getDetailById(id);
      if (res.code === 0) {
        res.data.lowest_price_time = moment(res.data.lowest_price_time).format('YYYY-MM-DD HH:mm:ss')
        this.setState({
          detail: res.data
        });
        this.verificationField(res.data);
      }
    } catch (error) {
      console.log('请求错误：' + error)
    }
  }
  verificationField(detail = {}) {
    this.setState({
      verification: {
        name: !!detail.name,
        site_name: !!detail.site_name,
        image_selector: !!detail.image_selector,
        url: !!detail.url,
        query_selector: !!detail.query_selector,
      }
    })
  }
  render() {
    const { detail = {}, verification } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'chevron-left', size: 30, color: '#fff', onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: `${detail.name}`, style: { color: '#fff', fontSize: 18 } }}
        />
        <ScrollView >
          <View style={{ flex: 1, alignItems: 'center', marginBottom: 16 }}>
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="名称"
              labelStyle={{ marginTop: 16 }}
              value={detail.name}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              errorMessage={verification.name ? null : '请输入名称'}
              onSubmitEditing={this.verificationField.bind(this, detail)}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, name: value },
                  verification: { ...verification, name: !!value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="站点名称"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              value={detail.site_name}
              errorMessage={
                verification.site_name ? null : '请输入站点名称'
              }
              onSubmitEditing={this.verificationField.bind(this, detail)}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, site_name: value },
                  verification: { ...verification, site_name: !value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="该值自动更新"
              label="图片地址"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              value={detail.image_url}
              editable={false}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="图片选择器"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              value={detail.image_selector}
              errorMessage={
                verification.image_selector ? null : '请输入图片选择器'
              }
              onSubmitEditing={this.verificationField.bind(this, detail)}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, image_selector: value },
                  verification: { ...verification, image_selector: !value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="商品地址"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              value={detail.url}
              errorMessage={
                verification.url ? null : '请输入商品地址'
              }
              onSubmitEditing={this.verificationField.bind(this, detail)}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, url: value },
                  verification: { ...verification, url: !value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="价格选择器"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              value={detail.query_selector}
              errorMessage={
                verification.query_selector ? null : '请输入价格选择器'
              }
              onSubmitEditing={this.verificationField.bind(this, detail)}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, query_selector: value },
                  verification: { ...verification, query_selector: !value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="会员价选择器"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              errorStyle={{ fontSize: 12 }}
              value={detail.vip_query_selector}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, vip_query_selector: value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="自动更新"
              label="现在价格"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              value={detail.current_price}
              editable={false}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="自动更新"
              label="会员价"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              value={detail.vip_price}
              editable={false}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="自动更新"
              label="最低价格"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              value={detail.lowest_price}
              editable={false}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="期望价格"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              value={detail.expect_price}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, expect_price: parseFloat(value) }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="自动更新"
              label="最低价出现时间"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              value={detail.lowest_price_time}
              editable={false}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="价格替换字符"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              value={detail.replace_str}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, replace_str: value }
                });
              }}
            />
            <Input
              containerStyle={{ width: '90%' }}
              placeholder="请输入"
              label="vip价替换字符"
              labelStyle={{ marginTop: 16 }}
              autoFocus={false}
              returnKeyType="next"
              value={detail.vip_replace_str}
              onChangeText={value => {
                this.setState({
                  detail: { ...detail, vip_replace_str: value }
                });
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ListItem
              containerStyle={{ paddingVertical: 8 }}
              switch={{
                value: detail.is_phone, onValueChange: value => {
                  this.setState({
                    detail: { ...detail, is_phone: value },
                  });
                }
              }}
              title="是否移动端"
            />
            <ListItem
              containerStyle={{ paddingVertical: 8 }}
              switch={{
                value: Status[detail.status] || false, onValueChange: value => {
                  this.setState({
                    detail: { ...detail, status: value ? 'ENABLE' : 'DISABLE' },
                  });
                }
              }}
              title="禁用/启用"
            />
            <ListItem
              containerStyle={{ paddingVertical: 8 }}
              title={`错误信息 ${detail.message}`}
            />
            <Button
              titleStyle={{ fontWeight: "700", color: 'white', marginHorizontal: 40 }}
              buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
              title='保存'
              onPress={this.onSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
  onSave = async () => {
    const { detail = {}, verification } = this.state;
    if (!verification.name || !verification.site_name || !verification.image_selector || !verification.url || !verification.query_selector) {
      alert('请检查必填字段！');
      return;
    }
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
      alert(meg);
      this.props.navigation.goBack();
    } catch (error) {
      alert('操作失败：' + error);
    }
  }
}
