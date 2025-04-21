import React from "react";
import { render,screen } from "@testing-library/react";
import Component from './Component'

test('默认属性',()=>{
    render(<Component />)
    const paragraph = screen.getByText('一行段落')
    expect(paragraph).toBeInTheDocument()
})

test('传入属性',()=>{
    render(<Component text='测试段落' isCenter={true} />)
    const paragraph = screen.getByText('测试段落')
    expect(paragraph).toBeInTheDocument()
    const p = paragraph.parentElement  //父元素
    expect(p).not.toBeNull()
    const style = p!.style || {}
    expect(style.textAlign).toBe('center')
})

test('多行文字',()=>{
    render(<Component text={"a\nb\nc"} />)
    const a = screen.getByText('a')
    expect(a).toBeInTheDocument()
    expect(a).toHaveTextContent('a')
    expect(a).not.toHaveTextContent('ab')
})
