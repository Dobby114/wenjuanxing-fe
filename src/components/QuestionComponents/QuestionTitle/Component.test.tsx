import React from 'react'
import Component from './Component'
import { render ,screen} from '@testing-library/react'


test("默认属性",()=>{
    render(<Component />)
    const title = screen.getByText('一行标题')
    expect(title).toBeInTheDocument()
})

test('传入属性',()=>{
    render(<Component text='测试标题' level={2} isCenter={true} />)
    const title = screen.getByText('测试标题')
    expect(title).toBeInTheDocument()
    expect(title.matches('h2')).toBeTruthy()
    const style = title.style
    expect(style.textAlign).toBe('center')
})