import { Button } from 'antd';
import React from 'react';

export default {
  'allcom': 'BeagleDao社区',
  'return': '返回',
  'login': '登陆',
  'register': '注册',
  'last_time': '上次',
  'latest_use': '最近使用',
  'password': '密码',
  'yes': '是的',
  'add': '添加',
  'confirm': '确定',
  'cancel': '取消',
  'private_key': '私钥',
  'wallet_address': '钱包地址',
  'ens_username': 'ENS用户名',
  'need_login': '您需要登陆访问当前资源',
  'public_group': '公共聊天组',
  'image': '图片',
  'new_message': '新消息',
  'receive_from': '收到来自',
  'success_transfer': '成功转出',
  'to': '到',
  'eth_account': '以太币数量',
  'ens_register_error_notice': '注册ENS名字出错，详情查看控制台',
  'password_error_notice': '密码验证错误',
  'no_keystore_notice': '未找到对应账号的密钥信息',
  'address_resolve_error_notice': '地址解析出错',
  'transaction_send_notice': '交易已发出，等待矿工打包中',
  'transaction_success_notice': '交易已发出，等待矿工打包中',
  'success_buy': '成功购买',
  'approve_success': '批准成功',
  'copy_address_success': '地址拷贝成功!',
  'init': '初始化',
  'initContract': '合约初始化',
  'newAccount': '新建账户',
  'transFax': 'Fax交易',
  'buyFax': '购买FAX',
  'approve': '批准FAX',
  'importKeystore': '导入Keystore',
  'importPrivateKey': '导入Private Key',
  'newMessage': '新消息',
  'transEther': '以太币交易',
  'transactionDone': '以太币交易',
  'receiveTransaction': '收到新交易',
  'notification_error': '出错',
  'notification_error_des': '详情请查看控制台',
  'notification_success': '成功',
  'connect_metamask': '连接Metamask',
  'connect_substrate': '连接Substrate',
  'transfer': '转账',
  'offline_notice': '对方可能不在线，请稍后再试',

  'index.white_paper': '白皮书',
  'index.faq': 'FAQ',
  'index.download': '下载',
  'index.quotation': '行情',
  'index.config_peer': '配置连接节点',
  'index.description': '构建在区块链公链基础设施之上，同时也为区块链用户、社区和项目服务的即时通讯服务',
  'index.visitor': '游客',
  'index.wallet_login': '钱包地址',
  'index.ens_login': 'ENS',
  'index.get_wallet': '注册',
  'index.login': '登陆',
  'index.encrypt_coin': '加密货币学习、交流、实践',
  'index.digital_currency': '数字资产托管、保存、交易',
  'index.network_status': '网络状态',
  'index.contact': '咨询傲通客服',
  'index.password_not_null': '密码不能为空！',
  'index.provider_error_prefix': '您与以太坊节点',
  'index.provider_error_suffix': '连接出现问题，请检查后刷新页面',
  'index.ens_format_error': 'ENS名称格式不正确',
  'index.ens_not_registered': 'ENS用户名未注册',
  'index.address_format_error': '地址格式不正确',
  'index.search_ens': '正在查询ENS地址...',
  'index.verify_password': '验证密码中...',
  'index.ens_name': 'ENS名称',
  'index.account_address': '账户地址',
  'index.use_callpass_to_communicate': '使用CALLPASS Web端进行通话',
  'index.confirm_call_allcom': '是否拨打“傲通网络”客服电话：021-50808850',
  'index.eth_peer': '以太坊节点',
  'index.swarm_peer': 'Swarm节点',
  'index.api_peer': 'API节点',
  'index.metamaskconnect':'用Metamask登录',
  'index.substrateconnect':'用Substrate登录',
  'index.substrate_rpc_peer':'Substrate节点',

  'register.pk_error': 'private key无效, 不满足椭圆曲线条件',
  'register.pk_format_error': 'private key格式不正确',
  'register.ens_no_usable': 'ENS用户名不可用',
  'register.ens_usable': 'ENS用户名可用',
  'register.creating_address': '正在创建钱包地址',
  'register.creating_ens': '正在注册ENS用户名',
  'register.searching': '查询中...',
  'register.create_address': '创建钱包地址',
  'register.create_address_only': '只创建钱包地址',
  'register.set_address_password': '为您的钱包地址设置密码',
  'register.set_address_ens_password': '为您的钱包地址设置ENS名称/账户密码',
  'register.ens_username': 'ENS用户名',
  'register.message_1': '1.ENS用户名与当前钱包地址相对应',
  'register.message_2': '2.密码设定后将无法更改，请牢记您的密码',
  'register.message_3': '3.在您登陆、交易、发送消息时需要用到此密码',
  'register.import_private_key': '导入私钥',
  'register.create_immediately': '立即创建',
  'register.input_private_key': '请输入需要导入账户的私钥',
  'register.eth_amount': '以太币数量',
  'register.fax_amount': 'FAX 数量',
  'register.password': '密码（用来加密你的私钥）',
  'register.input_account_password': '请输入账户密码',

  'regSuccess.no_wallet': '没有可用的钱包',
  'regSuccess.redirecting': '跳转中...',
  'regSuccess.congratulation': '恭喜，注册成功！你的账户信息为:',
  'regSuccess.copy_address': '拷贝地址',
  'regSuccess.login_immediately': '立即登陆',

  'status.search_account_info': '查询账户信息',
  'status.account_format_error': '账户格式错误',
  'status.input_ens': '请输入账户地址/ENS名称',
  'status.contract_status': '合约状态',
  'status.token_amount': '代币总量',
  'status.main_account_token_amount': '主账号剩余代币',
  'status.contract_brief': '合约简介',
  'status.token_contract': '代币合约',
  'status.token_symbol': '代币符号',
  'status.token_version': '代币版本',
  'status.contract_author': '合约创建者',
  'status.fax_token_amount': '合约可用FAX数量',
  'status.eth_amount': '账户Ether数量',
  'status.exchange_fax_amount': '已兑换FAX数量',
  'status.exchange_fax_price': '兑换价格/FAX',
  'status.fax_token_exchange_contract': 'FaxToken兑换合约',
  'status.fax_decrease_account': 'FAX代扣账户',
  'status.reward_expense': '奖励开销（FAX）',
  'status.message_profit': '消息收入（FAX）',
  'status.fax_im_token': 'FaxTokenIM即时消息合约',
  'status.ens_reg_table': 'ENS注册表',
  'status.fax_sub_domain_contract': 'fax子域名注册合约',
  'status.fax_domain_owner': 'fax域名所有者',
  'status.resolve_contract_address': '解析合约地址',
  'status.domain_resolve_contract': '域名解析合约',

  'chat.visitor_forbidden_message': '游客模式下，无法发送消息',
  'chat.message_not_null': '消息不能为空',
  'chat.public_room': '公共聊天室',
  'chat.no_nick_name': '无昵称',
  'chat.join_chat': '加入对话',
  'chat.send_message': '发送消息',

  'approve.contract_quota': '批准合约额度',
  'approve.exchange_contract': '兑换合约',
  'approve.im_messaging': '即时通讯',
  'approve.input_approve_fax_amount': '请输入准许合约花费的FAX数量',
  'approve.account_fax_amount': '当前账户FAX个数',
  'approve.confirm_approve': '确定批准',

  'byFax.buy_fax': '请输入需要购买的FAX数量',
  'byFax.input_buy_amount': '购买FAX',
  'byFax.related_message': '相关信息',
  'byFax.fax_exchange_contract': 'FAX兑换合约地址',
  'byFax.contract_fax_amount': '合约剩余FAX数量',
  'byFax.fax_price': 'FAX价格',
  'byFax.eth_fee': 'Ether费用',

  'transfer.not_null': '转账金额不能为空',
  'transfer.transfer_eth': '以太币转账',
  'transfer.input_account': '请输入账户地址',
  'transfer.eth_amount': '以太币数量',
  'transfer.confirm': '确定转账',
  'transfer.transfer_fax': 'FAX转账',
  'transfer.fax_amount': 'FAX代币数目',

  'account.logout_title': '是否登出',
  'account.logout_content': '请点击确定，登出账号',
  'account.visitor': '游客',
  'account.my_account': '我的账户',
  'account.me': '我',
  'account.logout_tooltip': '登出账号',
  'account.visitor_mode': '游客模式',
  'account.copy_address': '拷贝地址',
  'account.get_token': '领取代币',
  'account.login_reward_token': '登陆奖励 5 App:',
  'account.gotten_token': '已领取',
  'account.to_get_token': '领取',
  'account.register_reward_token': '注册奖励20 App:',
  'account.import_pk_format_error': '导入失败，请检查private key格式',
  'account.import_keystore_format_error': '导入失败，请检查keystore格式',
  'account.import_pk_error': '导入private key 出错',

  'home.shh_format_error': '地址/shh公钥格式不正确',
  'home.ens_name_format_error': 'ENS名称格式错误',
  'home.ens_name_not_register_error': '该名称尚未注册',
  'home.ens_name_not_register': 'ENS用户名未注册',
  'home.searching': '查询中...',
  'home.registered': '已注册',
  'home.public_room': '公共聊天室',
  'home.public_description': '公开',
  'home.add_dialogue': '添加对话',
  'home.ens_username': 'ENS用户名',
  'home.wallet_address': '钱包地址',
  'home.input_other_ens_name': '请输入对方ENS名称',
  'home.alert_address': '钱包地址:',
  'home.alert_shh_pubkey': 'Whisper公钥:',
  'home.my_nickname': '昵称:',
  'home.set_my_nickname': '为当前地址设置昵称',
  'home.input_other_address': '请输入对方地址',
  'home.launch_transfer': '发起转账',
  'home.current_balance': '当前账户余额:',
  'home.address': '地址:',
  'home.transfer_amount': '转账数量:',
  'home.input_transfer_fax_amount': '请输入App转账数量',
  'home.no_usable_wallet': '未找到可用钱包',
  'home.wrong_password': '密码错误',
  'home.offline': '离线',
  'home.my_account_info': '我的账户信息',
  'home.export_pk': '导出私钥',
  'home.attribute_name': '属性名',
  'home.attribute_value': '属性值',
  'home.table_account_address': '账户地址',
  'home.account_operation': '账户操作',
  'home.transfer_eth': '以太币转账',
  'home.transfer_fax': 'FAX转账',
  'home.buy_fax': '购买FAX',
  'home.approve_contract_quota': '批准合约额度',
  'home.check_contract_status': '查看合约状态',
  'home.finish': '完成',
  'home.next_step': '下一步',
  'home.export_pk_notice': '请妥善保管好您的私钥，这关系到您账户的所有数字资产安全，不要透露给任何人！',
  'home.input_password_notice': '请输入账户密码，然后点击下一步',
  'home.input_password': '请输入账户密码',

  'user.visitor_reward_forbidden': '获取奖励失败，游客无法获取奖励',
  'user.account_error': '账号异常，请重新登陆',
  'user.visitor_transaction_forbidden': '游客模式下，无法发起交易',

  'invest.contract_title': '合约信息',
  'invest.contract_total_invest': '投资总额(ether)',
  'invest.contract_total_user': '用户数',
  'invest.contract_balance': '合约余额(ether)',
  'invest.contract_balance_rate': 'Contract Balance Rate',
  'invest.user_title': '我的投资详情',
  'invest.user_invest': '总投入(ether)',
  'invest.user_deposit': '投资次数',
  'invest.user_dividend': '获利(ether)',
  'invest.user_referral_bonus': '推荐奖励(ether)',
  'invest.user_total_withdraw': '提现总额(ether)',
  'invest.user_referrer': '推荐人',
}
