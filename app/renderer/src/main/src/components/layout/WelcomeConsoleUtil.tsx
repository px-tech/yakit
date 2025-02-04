import React from "react";
import {randomString} from "@/utils/randomUtil";
import {showModal} from "@/utils/showModal";
import {YakLocalProcess} from "@/protected/YakLocalProcess";

const {ipcRenderer} = window.require("electron");

export const outputToWelcomeConsole = (msg: any) => {
    ipcRenderer.invoke("output-log-to-welcome-console", `${msg}`).then(() => {
    }).catch(e => {
        console.info(e)
    })
}

export const getRandomLocalEnginePort = (callback: (port: number) => any) => {
    ipcRenderer.invoke("get-random-local-engine-port").then((port: number) => {
        callback(port)
    }).catch(e => {
        console.info(e)
    })
}

export const isEngineConnectionAlive = () => {
    const text = randomString(30);
    return ipcRenderer.invoke("Echo", {text}).then((res: { result: string }) => {
        if (res.result !== text) {
            throw Error(`Engine dead`)
        }
        return true
    })
}

export const manageYakLocalProcess = () => {
    showModal({
        width: "80%",
        content: (
            <YakLocalProcess justClose={true}/>
        )
    })
}