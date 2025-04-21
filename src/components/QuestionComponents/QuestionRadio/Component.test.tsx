import React  from "react";

import { render,screen } from "@testing-library/react";
import Component from './Component'

test("默认属性",()=>{
    render(<Component />)
    const title = screen.getByText('单选标题')
    expect(title).toBeInTheDocument()
    for(let i = 1;i<4;i++){
        const radio = screen.getByDisplayValue(`item${i}`)
        expect(radio).toBeInTheDocument()
        const label = screen.getByText(`选项${i}`)
        expect(label).toBeInTheDocument()
    }
})

test("传入属性",()=>{
    const value = 'v3'
    render(<Component options={[{label:'p1',value:'v1'},{label:'p2',value:'v2'},{label:'p3',value:'v3'}]} value={value} />)
    const title = screen.getByText('单选标题')
    expect(title).toBeInTheDocument()
    for(let i = 1;i<4;i++){
        const radio = screen.getByDisplayValue(`v${i}`)
        expect(radio).toBeInTheDocument()
        const label = screen.getByText(`p${i}`)
        expect(label).toBeInTheDocument()
        const val = `v${i}`

        if(val===value){
            expect(radio.getAttribute('checked')).not.toBeNull()
        }
    }

    // 选中
})