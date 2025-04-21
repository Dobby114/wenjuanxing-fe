import React from "react";
import { render,screen } from "@testing-library/react";
import Component from './Component'

test("默认属性",()=>{
    render(<Component />)
    const title = screen.getByText('输入框标题')
    expect(title).toBeInTheDocument()
    const placeholder = screen.getByPlaceholderText('请输入...')
    expect(placeholder).toBeInTheDocument()
})

test("传入属性",()=>{
    render(<Component title="测试输入框标题" placeholder="测试输入框placeholder" />)
    const title = screen.getByText('测试输入框标题')
    expect(title).toBeInTheDocument()
    const placeholder = screen.getByPlaceholderText('测试输入框placeholder')
    expect(placeholder).toBeInTheDocument()
})