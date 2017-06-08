// @flow

import React, { Component } from 'react'
import Color from 'color'
import cn from 'classnames'
import styles from './Button.styles'
 
export type ButtonType = "button" | "reset" | "submit"
export type ButtonSizeType = "x-small" | "small" | "regular" | "large" | "x-large"

type ButtonPropsType = {
	active: boolean,
	disabled: boolean,
	block: boolean,
	shadow: boolean,
	gradient: boolean,
	round: boolean,
	onClick: () => void,
	bgColor: string,
	bgColorTo: string,
	type: ButtonType,
	color: string,
	size: ButtonSizeType,
	width: string,
	height: string,
	borderRadius: string,
	componentClass: string,
	children: Object,
}

export default class Button extends Component<void, ButtonPropsType, void>	{

	handleClick: Function

	constructor(props: ButtonPropsType) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event: Event) {
		const { disabled, onClick } = this.props

		if (disabled) {
			event.preventDefault()
			event.stopPropagation()
			return
		}

		if (onClick) {
			onClick(event)
		}
	}

	render() {
		const {
			disabled,
			children,
			active,
			block,
			color,
			round,
			size,
			width,
			height,
			bgColor,
			bgColorTo,
			borderRadius,
			shadow,
			gradient,
			componentClass,
			...props } = this.props
			
		if (disabled) {
			props.tabIndex = -1
			props.style = { pointerEvents: 'none', ...props.style }
		}

		const className = cn({
			button: true,
			disabled: disabled,
			active: active,
			block: block,
			shadow: shadow,
			round: round,
			[size]: size,
		})

		const bgColorObj = Color(bgColor || '#55acf1')
		const bgLuminosity = bgColorObj.luminosity() 
		const colorObj = Color(color || (bgLuminosity >= 0.5 ? 'black' : 'white'))

		props.style = {
			'color': colorObj.string(),
			'backgroundColor': bgColorObj.string(),
			'borderRadius': round ? '50%' : borderRadius || '20px',
			'boxShadow': shadow
				? `0px 4px 0px ${bgColorObj.darken(.25).string()}` 
				: 'none',
			'backgroundImage': gradient || bgColorTo
				? `linear-gradient(to right, ${bgColor}, ${bgColorTo || bgColorObj.lighten(.20).string()})`
				: 'none',
			...props.style
		}

		if (width) {
			props.style = {
				'width': width,
				...props.style
			}
		}

		 if (height) {
			props.style = {
				'height': height,
				...props.style
			}
		}

		switch(componentClass){
			case 'span': return <span {...props} className={className}>{ children }<style jsx>{styles}</style></span>
			case 'button': return <button {...props} className={className}>{ children }<style jsx>{styles}</style></button>
			case 'a': return <a {...props} className={className}>{ children }<style jsx>{styles}</style></a>
			default: return <div {...props} className={className}>{ children }<style jsx>{styles}</style></div>
		}
	}
}