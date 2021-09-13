import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

const InputGift = (props) => {
    const { giftNameValue, onChange } = props;

    return (
        <Input value={giftNameValue} onChange={onChange} />
    )
}
const InputIcon = (props) => {
    const { iconLinkValue, onChange } = props;

    return (
        <Input value={iconLinkValue} onChange={onChange} />
    )
}
const InputWeight = (props) => {
    const { weightValue, onChange } = props;

    return (
        <Input value={weightValue} onChange={onChange} placeholder="Number form 1 to 20" />
    )
}

const AddForm = (props) => {
    const [form] = Form.useForm();
    const { onSubmit } = props;
    const [ giftNameValue, setGiftNameValue ] = useState('');
    const [ iconLinkValue, setIconLinkValue ] = useState('');
    const [ weightValue, setWeightValue ] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
        onSubmit(values);
        form.resetFields();
        setGiftNameValue('');
        setIconLinkValue('');
        setWeightValue('');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onGiftChange = (e) => {
        setGiftNameValue(e.target.value);
    }
    const onIconChange = (e) => {
        setIconLinkValue(e.target.value);
    }
    const onWeightChange = (e) => {
        if (e.target.value === '') {
            setWeightValue('');
            return;
        }

        const newNumber = parseInt(e.target.value);

        if (Number.isNaN(newNumber)) {
            return;
        }

        setWeightValue(newNumber);
    }

    return (
        <div className="form-container">
            <Form
                className="form-form"
                name="basic"
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    className="form-item"
                    label="Gift Name"
                    name="giftName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the gift name',
                        },
                    ]}
                >
                    <InputGift giftNameValue={giftNameValue} onChange={onGiftChange}/>
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Icon Link"
                    name="iconLink"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the icon link',
                        },{
                            validator: (_, value) => {
                                const str = value;
                                const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
                                const objExp = new RegExp(Expression);
                                if (objExp.test(str) === true) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Please input a URL'));
                                }
                            }
                        }
                    ]}
                >
                    <InputIcon iconLinkValue={iconLinkValue} onChange={onIconChange} />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Weight"
                    name="weight"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the weight',
                        },
                    ]}
                >
                    <InputWeight weightValue={weightValue} onChange={onWeightChange} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddForm;