import React from "react";
import { render,screen } from "@testing-library/react";
import Component from './Component'

test("默认属性",()=>{
    render(<Component />)
    const textarea = screen.getByText('输入框标题')
    expect(textarea).toBeInTheDocument()
    const placeholder = screen.getByPlaceholderText('请输入...')
    expect(placeholder).toBeInTheDocument()
})

test("传入属性",()=>{
    render(<Component title="测试textarea标题" placeholder="测试textarea placeholder" />)
    const textarea = screen.getByText('测试textarea标题')
    expect(textarea).toBeInTheDocument()
    const placeholder = screen.getByPlaceholderText('测试textarea placeholder')
    expect(placeholder).toBeInTheDocument()
})