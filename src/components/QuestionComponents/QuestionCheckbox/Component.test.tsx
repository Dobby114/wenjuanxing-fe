import React from "react";
import { render,screen } from "@testing-library/react";
import Component from "./Component";

test('默认属性',()=>{
    render(<Component />)
    const title = screen.getByText('多选框标题')
    expect(title).toBeInTheDocument()
    for(let i = 1;i<4;i++){
        const checkbox = screen.getByDisplayValue(`option${i}`)
        expect(checkbox).toBeInTheDocument()
        const label = screen.getByText(`选项${i}`)
        expect(label).toBeInTheDocument()
        expect(checkbox.getAttribute('checked')).toBeNull()
    }
})