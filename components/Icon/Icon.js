// @flow

import React, { Component } from 'react'
import classNames from 'classnames'

type IconPropsType = {
	name: string,
	color: string,
	fontSize: string,
}

type DefaultIconPropsType = {
	color: string,
	fontSize: string,
}

export default class Icon extends Component<DefaultIconPropsType, IconPropsType, void>	{

	static defaultProps = {
		color: 'inherit',
		fontSize: 'inherit',
	}

	render() {
		const { name, color, fontSize, ...props } = this.props
		
		const style = {
			color: color,
			fontSize: fontSize,
			verticalAlign: 'middle',
		}

		const className = classNames({
			[`icon-${name}`]: true,
		})

		return (
			<i className={className} style={style} {...props} />
		)
	}
}
