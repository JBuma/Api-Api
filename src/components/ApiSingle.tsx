import { h, Component } from 'preact';
import '../styles/_api-single.scss';

interface ApiProps {
	name: string;
	category: string;
	auth: string;
	cors: string;
	description: string;
	hasHTTPS: boolean;
	link: string;
}

// TODO: make card component
export default class ApiSingle extends Component<ApiProps, {}> {
	private convertToClassname = (str: string): string => {
		return str.replace(/\W/g, '').toLowerCase();
	}
	public render() {
		return (
			<div className="api">
				<div className={'api--category ' + this.convertToClassname(this.props.category)} />
				<div className="api--name">
					<h3 className="name" ><a href={this.props.link}>{this.props.name}</a></h3>
				</div>
				<div className="api--description">
					<p className="description">{this.props.description}</p>
				</div>
				<div className="api--info">
					<p className="info-group">
						<span className="info-label">Cors:</span>
						<span className="info-value">{this.props.cors.length > 0 ? this.props.cors : 'No'}</span>
					</p>
					<p className="info-group" >
						<span className="info-label">Auth:</span>
						<span className="info-value">{this.props.auth.length > 0 ? this.props.auth : 'None'}</span>
					</p>
					<p className="info-group" >
						<span className="info-label">HTTPS?</span>
						<span className="info-value">{this.props.hasHTTPS ? 'Yes' : 'No'}</span>
					</p>
					<p className="info-group">
						<span className="info-label">Category:</span>
						<span className="info-value">{this.props.category}</span>
					</p>
				</div>
			</div>
		);
	}
}
