import { h, Component } from 'preact';

interface HttpsSelectorState {
	stringValue: string;
}
interface HttpsSelectorProps {
	title: string;
	queryOption: string;
	onChange: (e: any, parameter: string) => void;
}

export default class HttpsSelector extends Component<HttpsSelectorProps, HttpsSelectorState> {
	constructor(props: HttpsSelectorProps) {
		super(props);
		this.state = {
			stringValue: '',
		};
	}
	private handleChange = (e: any) => {
		this.setState({ stringValue: e.target.value });
	}
	public render() {
		return (
			<div className="form-group">
				<label for="cors-select">{this.props.title}</label>
				<input
					onChange={(e: Event) => {
						this.props.onChange(e, this.props.queryOption);
						this.handleChange(e);
					}}
					type="text"
					name="string-selector"
				/>
			</div>
		);
	}
}
