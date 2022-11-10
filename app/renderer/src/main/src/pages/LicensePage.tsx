import React, {ReactNode, useEffect, useRef, useState} from "react"
import {failed, info, success} from "@/utils/notification"
import {NetWorkApi} from "@/services/fetch"
import {API} from "@/services/swagger/resposeType"
import {Button, Col, Divider, Form, Modal, notification, Row, Spin} from "antd"
import {InputItem} from "@/utils/inputUtil"
import CopyToClipboard from "react-copy-to-clipboard";
const {ipcRenderer} = window.require("electron")
const {Item} = Form;


export interface LicensePageProps {
    onLicenseVerified: () => void
}
interface LicenseGetProps {}
interface LicenseResProps {
    org: string,
    license:string
    ddl_timestamp: number
}
interface LicensePostProps {
    license:string
    machineCode:string
}
const LicensePage: React.FC<LicensePageProps> = (props) => {
    const [licenseRequest, setLicenseRequest] = useState("");
    const [loading, setLoading] = useState(false);
    const [paramsObj, setParamsObj] = useState<LicensePostProps>({license: "",machineCode:""});

    useEffect(() => {
        setLoading(true)
        NetWorkApi<LicenseGetProps, LicenseResProps>({
            method: "get",
            url: "http://192.168.101.100:8083/api/license",
            params: {}
        })
            .then((res) => {
                console.log("License数据源：", res)
                if (res.license) {
                    setLicenseRequest(res.license)
                }
                else{
                    props.onLicenseVerified()
                }
                ipcRenderer.invoke("GetMachineID", {}).then((e) => {
                    console.log("GetMachineID",e)
                })
            })
            .catch((err) => {
                failed("获取License失败：" + err)
            })
            .finally(() => {setLoading(false)})
    }, [])

    if (!licenseRequest) {
        return <Spin tip={"加载 license"}/>
    }

    const UploadLicense = () => {
        setLoading(true)
        let params = {
            ...paramsObj
        }
        NetWorkApi<LicensePostProps, LicensePostProps>({
            method: "post",
            url: "http://192.168.101.100:8083/api/license",
            data: params
        })
            .then((res) => {
                console.log("License激活数据源：", res)
            })
            .catch((err) => {
                failed("激活License失败：" + err)
            })
            .finally(() => {setLoading(false)})
    }

    return <div>
        <Spin spinning={loading}>
            <Row style={{paddingTop: 50}}>
                <Col span={4}/>
                <Col span={16}>
                    <Form
                        layout={"horizontal"} labelCol={{span: 4}} wrapperCol={{span: 18}}
                        onSubmitCapture={e => {
                            e.preventDefault()

                            if (!paramsObj.license) {
                                Modal.error({title: "空 License..."})
                                return
                            }

                            UploadLicense()

                        }}
                    >
                        <Item label={" "} colon={false}>
                            <h1>使用 License 注册您的产品</h1>
                        </Item>
                        <InputItem
                            label={"License 申请码"}
                            textarea={true} textareaRow={10}
                            disable={true}
                            extraFormItemProps={{
                                style: {
                                    marginBottom: 4,
                                }
                            }}
                            value={licenseRequest}
                        />
                        <Item label={" "} colon={false} style={{textAlign: "left"}}
                              help={"在申请 license 时，请把这一串申请码给销售人员以便生成您专属的 License"}
                        >
                            <CopyToClipboard text={licenseRequest} onCopy={(t, ok) => {
                                if (ok) {
                                    notification["success"]({message: "复制成功"})
                                }
                            }}>
                                <Button type={"link"} size={"small"}>
                                    点此复制该 License 请求码
                                </Button>
                            </CopyToClipboard>
                        </Item>
                        <Divider/>
                        <InputItem
                            label={"您的许可证"}
                            textarea={true}
                            textareaRow={13}
                            setValue={license => setParamsObj({...paramsObj, license})} value={paramsObj.license}
                        />
                        <Item label={" "} colon={false}>
                            <Button
                                type={"primary"} htmlType={"submit"}
                                style={{width: "100%", height: 60}}
                            >点此使用 License 激活您的产品</Button>
                        </Item>
                    </Form>
                </Col>
                <Col span={4}/>

            </Row>
        </Spin>
    </div>
}

export default LicensePage