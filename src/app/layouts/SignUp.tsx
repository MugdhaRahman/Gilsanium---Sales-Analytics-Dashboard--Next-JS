"use client";

import React, {CSSProperties, FormEvent, useState} from "react";
import {Button, Checkbox, Form, Grid, Input, message, theme, Typography} from "antd";
import {GithubOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import Image from "next/image";
import {loginWithGithub} from "@/utils/appwrite";
import {account} from "@/utils/appwrite";
import {ID} from "appwrite";


const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text, Title, Link} = Typography;

type LoginFormValues = {
    email: string;
    password: string;
    remember?: boolean;
};

export default function SignUp() {

    // const [signUpEmail, setSignUpEmail] = useState<string>("");
    // const [signUpPassword, setSignUpPassword] = useState<string>("");
    // const [loginEmail, setLoginEmail] = useState<string>("");
    // const [loginPassword, setLoginPassword] = useState<string>("");
    //

    const {token} = useToken();
    const screens = useBreakpoint();

    const onFinish = (values: LoginFormValues) => {
        console.log("Received values of form: ", values);
    };

    const styles: Record<
        "container" | "footer" | "forgotPassword" | "header" | "section" | "text" | "title",
        CSSProperties
    > = {
        container: {
            margin: "0 auto",
            padding: screens.md
                ? `${token.paddingXL}px`
                : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px",
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%",
        },
        forgotPassword: {
            float: "right",
        },
        header: {
            marginBottom: token.marginXL,
        },
        section: {
            alignItems: "center",
            backgroundColor: 'rgba(43,54,116,0.15)',
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
        },
        text: {
            color: token.colorTextSecondary,
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading5 : token.fontSizeHeading5, marginTop: 16
        },
    };

    const onGithub = async () => {
        try {
            loginWithGithub(); // Will redirect out; no need to await result
        } catch (err) {
            console.error(err);
            message.error("Failed to start GitHub login");
        }
    };

    // async function handleSignup(e: FormEvent) {
    //     e.preventDefault();
    //
    //     try {
    //         const response = await account.create(
    //             ID.unique(),
    //             signUpEmail,
    //             signUpPassword
    //         );
    //         console.log(response);
    //
    //         await account.createEmailPasswordSession(signUpEmail, signUpPassword);
    //
    //         window.location.href = "/dashboard";
    //     } catch (err: any) {
    //         console.error(err);
    //         alert(err.message || "An error occurred");
    //     }
    // }
    //
    // async function handleLogin(e: FormEvent) {
    //     e.preventDefault();
    //
    //     try {
    //         await account.createEmailPasswordSession(loginEmail, loginPassword);
    //         window.location.href = "/dashboard";
    //     } catch (err: any) {
    //         console.error(err);
    //         alert(err?.message || "Something went wrong");
    //     }
    // }

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Image src="/logo.svg" alt="logo" width={76} height={30} priority/>
                    <Title style={styles.title}>Sign in</Title>
                    <Text style={{color: token.colorWarning}}>
                        Please Login with Github. Other login function cuming soon...
                    </Text>
                </div>

                <Form<LoginFormValues>
                    name="normal_login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {type: "email" as const, required: true, message: "Please input your Email!"},
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="Email"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "Please input your Password!"}]}
                    >
                        <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a style={styles.forgotPassword} href="#">
                            Forgot password?
                        </a>
                    </Form.Item>

                    <Form.Item style={{marginBottom: 0}}>
                        <Button block type="primary" disabled htmlType="submit">
                            Log in
                        </Button>
                        <Button block onClick={onGithub} icon={<GithubOutlined/>}
                                style={{background: token.colorFillSecondary, marginTop: 16}}>
                            Log in with github
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>Do not have an account?</Text>{" "}
                            <Link href="#">Sign up now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
