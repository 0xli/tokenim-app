import React, { Component } from 'react';
import { connect } from 'dva'
import { Form, Input, Button, Spin, Select, Alert } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import { UserOutlined, SwapOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Option } = Select;

class TransEther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adress: '',
      number: 0,
      unit: 1000000000000000000,
    }
  }

  transferEther = () => {
    const { address, number, unit } = this.state;
    const { isMetamask } = this.props;
    const ether = number * unit;
    if (ether <= 0) {
      alert(formatMessage({ id: 'transfer.not_null' }));
      return ;
    }

    if (isMetamask) {
      this.props.dispatch({ type: 'user/metamaskTransferEth', payload: { to: address, value: ether } });
      return;
    }
    this.props.dispatch({ type: 'user/transEther', payload: { to: address, ether } });
  }
  render() {
    const { loading } = this.props;
    const { transEtherLoading } = this.props.user;
    const { number, unit } = this.state;
    const transfering = loading.effects['user/metamaskTransferEth'] || loading.effects['user/transEther'];
    const selectAfter = <Select defaultValue={1000000000000000000} onChange={(val) => this.setState({ unit: val })}>
      <Option value={1000000000000000000}>Ether</Option>
      <Option value={1000000000}>Gwei</Option>
      <Option value={1}>Wei</Option>
    </Select>

    return (
      <div>
        <h3>{formatMessage({ id: 'transfer.transfer_eth' })}</h3>
        <Spin spinning={transfering || transEtherLoading}>
          <FormItem>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'transfer.input_account' })}
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<SwapOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'transfer.eth_amount' })}
              addonAfter={selectAfter}
              onChange={(e) => this.setState({ number: e.target.value })}
            />
            <Alert message={`${(number * unit).toLocaleString()}  Wei`} type="info" />
          </FormItem>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='primary' onClick={this.transferEther} >
              {formatMessage({ id: 'transfer.confirm' })}
          </Button>
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isMetamask: state.account.isMetamask,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(TransEther);
