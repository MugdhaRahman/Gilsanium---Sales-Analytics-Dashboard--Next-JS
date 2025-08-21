// "use client";
//
// import React, {CSSProperties, FormEvent, useState} from "react";
// import {Button, Checkbox, Form, Input, message, Typography} from "antd";
// import {GithubOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
// import Image from "next/image";
// import {loginWithGithub} from "@/utils/appwrite";
// import {theme} from 'antd'
//
//
// const {Text, Title, Link} = Typography;
//
// type LoginFormValues = {
//     email: string;
//     password: string;
//     remember?: boolean;
// };
//
//
// export default function signIn() {
//
//     const {token} = theme.useToken();
//
//     const onFinish = (values: LoginFormValues) => {
//         console.log("Received values of form: ", values);
//     };
//
//
//     const onGithub = async () => {
//         try {
//             loginWithGithub(); // Will redirect out; no need to await result
//         } catch (err) {
//             console.error(err);
//             message.error("Failed to start GitHub login");
//         }
//     };
//
//
//     return (
//         <section style={{
//             alignItems: "center",
//             backgroundColor: 'rgba(65,79,244,0.15)',
//             display: "flex",
//             height: "100vh",
//             padding: `0px`
//         }}>
//             <div style={{
//                 margin: "0 auto",
//                 padding: 0,
//                 width: "380px",
//             }}>
//                 <div>
//                     <Image src="/logo.svg" alt="logo" width={76} height={30} priority/>
//                     <Title style={{marginTop: 16}}>Sign in</Title>
//                     <Text style={{color: token.colorWarning}}>
//                         Please Login with Github. Other login function cuming soon...
//                     </Text>
//                 </div>
//
//                 <Form<LoginFormValues>
//                     name="normal_login"
//                     initialValues={{remember: true}}
//                     onFinish={onFinish}
//                     layout="vertical"
//                     requiredMark="optional"
//                 >
//                     <Form.Item
//                         name="email"
//                         rules={[
//                             {type: "email" as const, required: true, message: "Please input your Email!"},
//                         ]}
//                     >
//                         <Input prefix={<MailOutlined/>} placeholder="Email"/>
//                     </Form.Item>
//
//                     <Form.Item
//                         name="password"
//                         rules={[{required: true, message: "Please input your Password!"}]}
//                     >
//                         <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
//                     </Form.Item>
//
//                     <Form.Item>
//                         <Form.Item name="remember" valuePropName="checked" noStyle>
//                             <Checkbox>Remember me</Checkbox>
//                         </Form.Item>
//                         <a style={{float: "right"}} href="#">
//                             Forgot password?
//                         </a>
//                     </Form.Item>
//
//                     <Form.Item style={{marginBottom: 0}}>
//                         <Button block type="primary" disabled htmlType="submit">
//                             Log in
//                         </Button>
//                         <Button block onClick={onGithub} icon={<GithubOutlined/>}
//                                 style={{background: token.colorFillSecondary, marginTop: 16}}>
//                             Log in with github
//                         </Button>
//                         <div style={{
//                             marginTop: token.marginLG,
//                             textAlign: "center",
//                             width: "100%",
//                         }}>
//                             <Text style={{color: token.colorTextSecondary,}}>Do not have an account?</Text>{" "}
//                             <Link href="#">Sign up now</Link>
//                         </div>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </section>
//     );
// }