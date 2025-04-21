import React from "react";
import Component from "./Component";
import { render,screen } from "@testing-library/react";


test("默认属性",()=>{
    render(<Component />)
    const title = screen.getByText('问卷标题')
    expect(title).toBeInTheDocument()
})

test("传入属性",()=>{
    render(<Component desc="单元测试"></Component>)
    const desc = screen.getByText('单元测试')
    expect(desc).toBeInTheDocument()
})

test('多行文字',()=>{
    render(<Component desc={"a\nb\nc"} />)
    const a = screen.getByText('a')
    expect(a).toBeInTheDocument()
    expect(a).toHaveTextContent('a')
    expect(a).not.toHaveTextContent('ab')
})

