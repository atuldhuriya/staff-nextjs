"use client"
import { Button, Card, Form, Input } from "antd"
import { useState } from "react"

const CreateStaff = () => {
    const [firstName,setFirstName]=useState("")
    const [lastName ,setLastName]=useState("")
    const [phone ,setPhone]=useState("")
    const [email ,setEmail]=useState("")
    const [password ,setPassword]=useState("")
    const hendalsubmit =() =>{
       console.log(firstName);
       console.log(lastName);
       console.log(phone);
       console.log(email);
       console.log(password);  
    }
    return <>

        <Card title="Create Staff" bordered={false}>
            <Form layout="vertical" onFinish={hendalsubmit}>
                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "This field is required !" }]}>
                    <Input placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}}/>
                </Form.Item>

                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "This field is required !" }]}>
                    <Input placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input type="Phone" placeholder="Phone" onChange={(e)=>{setPhone(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                       Create
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </>
}
export default CreateStaff