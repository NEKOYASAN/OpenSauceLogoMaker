import {Box, Button, Container, Flex, FormControl, FormLabel, Input, Link} from "@chakra-ui/react";
import OpenSourceLogo from "../components/OpenSourceLogo";
import {useEffect, useState} from "react";
import {ChromePicker} from "react-color";
import {toBase64} from "next/dist/next-server/lib/to-base-64";
export interface State {
    firstLine: string,
    secondLine: string,
    colorOne: string,
    colorTwo: string,
    colorThree: string
}
const Home = () => {
    const [state, setState] = useState<State>({
        firstLine: "/*Code for Japan",
        secondLine: "{established:in-2013",
        colorOne: "#00bdac",//缶と文字の一部
        colorTwo: "#e0e558",//文字黄色
        colorThree: "#ff854f",//蓋裏とか
    })
    const [png, setPng] = useState<string>("");
    const [svg, setSvg] = useState<string>("");
    useEffect(() => {
        const svg = document.querySelector("svg");
        if (svg) {
            let svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            canvas.width = svg.height.baseVal.value * 0.52;
            canvas.height = svg.height.baseVal.value * 0.9;

            const ctx = canvas.getContext("2d");
            if (ctx) {
                const image = new Image;
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);
                    setPng(canvas.toDataURL("image/png"))
                }
                image.src = "data:image/svg+xml;charset=utf-8;base64," + toBase64(unescape(encodeURIComponent(svgData)));
            }

            if(!svgData.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)){
                svgData = svgData.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if(!svgData.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)){
                svgData = svgData.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            svgData = '<?xml version="1.0" standalone="no"?>\r\n' + svgData;

            setSvg("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svgData));

        }
    })
    return (
        <Flex maxH={"95vh"} height={"95vh"}>
            <OpenSourceLogo {...state} />
            <Box mr={6}>
                <FormControl>
                    <FormLabel>FirstLine</FormLabel>
                    <Input value={state.firstLine} onChange={(e) => setState((currentState) => { return {
                        ...currentState,
                        firstLine: e.target.value
                    }})}/>
                </FormControl>
                <FormControl>
                    <FormLabel>SecondLine</FormLabel>
                    <Input value={state.secondLine} onChange={(e) => setState((currentState) => { return {
                        ...currentState,
                        secondLine: e.target.value
                    }})}/>
                </FormControl>
                <Flex my={2}>
                    <Box mx={2}>
                    <ChromePicker color={state.colorOne} onChange={(e) => {
                        setState((currentState) => { return {
                            ...currentState,
                            colorOne: e.hex
                        }})
                    }} />
                    </Box>
                    <Box mx={2}>
                    <ChromePicker color={state.colorTwo} onChange={(e) => {
                        setState((currentState) => { return {
                            ...currentState,
                            colorTwo: e.hex
                        }})
                    }} />
                    </Box>
                </Flex>
                <Flex my={2}>
                    <Box mx={2}>
                    <ChromePicker color={state.colorThree} onChange={(e) => {
                        setState((currentState) => { return {
                            ...currentState,
                            colorThree: e.hex
                        }})
                    }} />
                    </Box>
                </Flex>
                <Flex my={2}>
                    <Box mx={2}>
                        <Link href={png} download={"opensource.png"} disabled={png === ""} >Download PNG</Link>
                    </Box>
                    <Box mx={2}>
                        <Link href={svg} download={"opensource.svg"} disabled={svg === ""} >Download SVG</Link>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Home
