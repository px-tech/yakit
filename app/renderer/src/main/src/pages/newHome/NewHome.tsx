import React, {ReactNode, useEffect, useRef, useState} from "react"
import {Row, Col} from "antd"
import {} from "@ant-design/icons"
import style from "./newHome.module.scss"
import classNames from "classnames"
import cloneDeep from "lodash/cloneDeep"
import {Route, DefaultRouteMenuData, MenuDataProps} from "@/routes/routeSpec"
import {AuditOutlined, CodeOutlined} from "@ant-design/icons"
import {
    MenuComprehensiveCatalogScanningAndBlastingDeepIcon,
    MenuPluginBatchExecutionDeepIcon,
    MenuPortScanningDeepIcon,
    MenuSpecialVulnerabilityDetectionDeepIcon,
    MenuPluginWarehouseDeepIcon,
    MenuYakRunnerDeepIcon,
    MenuMITMInteractiveHijackingDeepIcon,
    MenuWebFuzzerDeepIcon,
    MenuBlastingAndUnauthorizedTestingDeepIcon,
    MenuCodecDeepIcon,
    MenuDataComparisonDeepIcon,
    AuditOutlinedDeepIcon,
    MenuPortListenerDeepIcon,
    MenuReverseConnectionServerDeepIcon,
    MenuDNSLogDeepIcon,
    MenuICMPSizeLogDeepIcon,
    MenuTCPPortLogDeepIcon,
    MenuYsoJavaHackDeepIcon,

} from "@/pages/customizeMenu/icon/homeIcon"
const {ipcRenderer} = window.require("electron")

interface RouteTitleProp {
    title: string
}

const RouteTitle: React.FC<RouteTitleProp> = (props) => {
    const {title} = props
    return <div className={style["home-page-title"]}>{title}</div>
}

interface RouteItemProp {
    dataSource: DataItem
}

const RouteItem: React.FC<RouteItemProp> = (props) => {
    const {dataSource} = props
    return (
        <div>
            <div className={classNames(style["icon-box"])}>
                <div>{dataSource.icon}</div>
                <div>2</div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
interface DataItem {
    id: string
    key: Route
    icon: JSX.Element
    describe: string
    label: string
}

interface newHomeListData {
    id: string
    label: string
    subMenuData: DataItem[]
}

interface RouteListProp {
    colLimit?: 1 | 2 | 3
    data: newHomeListData
}

const RouteList: React.FC<RouteListProp> = (props) => {
    const {colLimit = 1, data} = props
    const [span, setSpan] = useState(24 / colLimit)
    return (
        <div>
            <RouteTitle title={data.label} />
            <Row>
                {data.subMenuData.map((item) => (
                    <Col span={span} key={item.id}>
                        <RouteItem dataSource={item} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

const newHomeList: newHomeListData[] = [
    {
        id: "1",
        label: "资产搜集",
        subMenuData: [
            {
                id: "1-1",
                key: Route.Mod_ScanPort,
                label: "端口/指纹扫描",
                icon: <MenuPortScanningDeepIcon />,
                describe: "对 IP、IP段、域名等端口进行 SYN、指纹检测、可编写插件进行检测、满足更个性化等需求"
            }
            // {
            //     id: "1-2",
            //     key: undefined,
            //     label: "综合目录扫描与爆破",
            //     icon: <MenuComprehensiveCatalogScanningAndBlastingDeepIcon />,
            //     describe: "带有内置字典的综合目录扫描与爆破"
            // }
        ]
    },
    {
        id: "2",
        label: "漏洞检测",
        subMenuData: [
            {
                id: "2-1",
                key: Route.PoC,
                label: "专项漏洞检测",
                icon: <MenuSpecialVulnerabilityDetectionDeepIcon />,
                describe: "通过预制漏洞源码，对特定目标进行专项漏洞检测，可以自定义新增 POC 种类"
            },
            {
                id: "2-2",
                key: Route.BatchExecutorPage,
                label: "插件批量执行",
                icon: <MenuPluginBatchExecutionDeepIcon />,
                describe: "自由选择需要的 POC 进行批量漏洞检测"
            }
        ]
    },
    {
        id: "3",
        label: "进阶功能",
        subMenuData: [
            {
                id: "3-1",
                key: Route.ModManager,
                label: "插件仓库",
                icon: <MenuPluginWarehouseDeepIcon />,
                describe: "目前插件为 6 大类型，可根据需要灵活编写插件，支持从 GitHub 加载插件 POC 种类"
            },
            {
                id: "3-2",
                key: Route.YakScript,
                label: "Yak Runner",
                icon: <MenuYakRunnerDeepIcon />,
                describe: "使用特有的 Yaklang 进行编程，直接调用引擎最底层能力 POC 种类"
            }
        ]
    },
    {
        id: "4",
        label: "渗透测试工具",
        subMenuData: [
            {
                id: "4-1",
                key: Route.HTTPHacker,
                label: "MITM 交互式劫持",
                icon: <MenuMITMInteractiveHijackingDeepIcon />,
                describe: "安装 SSL/TLS 证书，劫持浏览器所有流量请求、响应数据包，提供手动劫持与被动扫描两种模式"
            },
            {
                id: "4-2",
                key: Route.HTTPFuzzer,
                label: "Web Fuzzer",
                icon: <MenuWebFuzzerDeepIcon />,
                describe: "通过核心模糊测试标签语法，实现了对 Burpsuite 的 Repeater 和 Intruder 的完美整合"
            },
            {
                id: "4-3",
                key: Route.Mod_Brute,
                label: "爆破与未授权检测",
                icon: <MenuBlastingAndUnauthorizedTestingDeepIcon />,
                describe: "对目标的登录账号、密码等进行爆破，在爆破前会进行未授权检测"
            }
        ]
    },
    {
        id: "5",
        label: "小工具",
        subMenuData: [
            {
                id: "5-1",
                key: Route.Codec,
                label: "Codec",
                icon: <MenuCodecDeepIcon />,
                describe:
                    "可对数据进行各种处理（包括加密、解密、反序列化、Json 处理等等），还可通过插件自定义数据处理方法"
            },
            {
                id: "5-2",
                key: Route.DataCompare,
                label: "数据对比",
                icon: <MenuDataComparisonDeepIcon />,
                describe: "将数据进行对比，快速识别不同处"
            },
            {
                id: "5-3",
                key: Route.PayloadManager,
                label: "Payload 管理",
                icon: <AuditOutlinedDeepIcon />,
                describe: "通过上传文件、手动删改等，自定义 Payload，可在爆破和 Web Fuzzer 中进行使用"
            }
        ]
    },
    {
        id: "6",
        label: "反连管理",
        subMenuData: [
            {
                id: "6-1",
                key: Route.ShellReceiver,
                label: "端口监听器",
                icon: <MenuPortListenerDeepIcon />,
                describe: "反弹 Shell 接收工具，可以在服务器上开启一个端口，进行监听，并进行交互"
            },
            {
                id: "6-2",
                key: Route.ReverseServer_New,
                label: "反连服务器",
                icon: <MenuReverseConnectionServerDeepIcon />,
                describe: "使用协议端口复用技术，同时在一个端口同时实现 HTTP / RMI / HTTPS 等协议的反连"
            },
            {
                id: "6-3",
                key: Route.DNSLog,
                label: "DNSLog",
                icon: <MenuDNSLogDeepIcon />,
                describe: "自动生成一个子域名，任何查询到这个子域名的 IP 被集合展示在列表中"
            },
            {
                id: "6-4",
                key: Route.ICMPSizeLog,
                label: "ICMP-SizeLog",
                icon: <MenuICMPSizeLogDeepIcon />,
                describe: "使用 ping 携带特定长度数据包判定 ICMP 反连"
            },
            {
                id: "6-5",
                key: Route.TCPPortLog,
                label: "TCP-PortLog",
                icon: <MenuTCPPortLogDeepIcon />,
                describe: "使用未开放的随机端口来判定 TCP 反连"
            },
            {
                id: "6-6",
                key: Route.PayloadGenerater_New,
                label: "Yso-Java Hack",
                icon: <MenuYsoJavaHackDeepIcon />,
                describe: "配置序列化 Payload 或恶意类"
            }
        ]
    }
]

export interface NewHomeProp {}
const NewHome: React.FC<NewHomeProp> = (props) => {
    useEffect(() => {
        console.log("tabList", newHomeList)
    }, [])

    return (
        <div className={style["new-home-page"]}>
            <div className={classNames(style["home-top-block"], style["border-bottom-box"])}>
                <div className={classNames(style["top-small-block"], style["border-right-box"])}>
                    <RouteList data={newHomeList[0]} />
                </div>
                <div className={classNames(style["top-big-block"], style["border-right-box"])}>
                    <div className={classNames(style["top-in"], style["border-bottom-box"])}>
                        <RouteList data={newHomeList[1]} colLimit={2} />
                    </div>
                    <div className={style["bottom-in"]}>
                        <RouteList data={newHomeList[2]} colLimit={2} />
                    </div>
                </div>
                <div className={classNames(style["top-small-block"], style["border-right-box"])}>
                    <RouteList data={newHomeList[3]} />
                </div>
                <div className={style["top-small-block"]}>
                    <RouteList data={newHomeList[4]} />
                </div>
            </div>
            <div className={style["home-bottom-block"]}>
                <div className={classNames(style["bottom-big-block"], style["border-right-box"])}>
                    <RouteList data={newHomeList[5]} />
                </div>
                <div className={style["bottom-small-block"]}>
                    <RouteTitle title='插件商店' />
                </div>
            </div>
        </div>
    )
}

export default NewHome
