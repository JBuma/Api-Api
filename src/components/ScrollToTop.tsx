import { h, Component } from 'preact';
import '../styles/_scroll-to-top.scss';

interface ScrollToTopProps {
	topSelector: string;
}

export default class ScrollToTop extends Component<ScrollToTopProps, {}> {
	public render() {
		return (
			<a href={'#' + this.props.topSelector} >
				<button id="scroll-to-top">
					^
			</button>
			</a>
		);
	}
}
