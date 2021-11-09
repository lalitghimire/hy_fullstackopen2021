import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
    const blog = {
        title: 'this is blog render testing',
        author: 'tester',
        url: 'url.com',
        likes: 100,
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('this is blog render testing')
    expect(component.container).toHaveTextContent('tester')
    expect(component.container).not.toHaveTextContent('url.com')
    expect(component.container).not.toHaveTextContent('100')
})
