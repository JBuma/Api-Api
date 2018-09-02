import { h, Component } from 'preact';

interface HttpsSelectorState {
	selectedCors: boolean | 'Any';
	corsTypes: ['Any', true, false];
}
interface HttpsSelectorProps {
	queryOption: string;
	onChange: (e: any, parameter: string) => void;
}

export default class HttpsSelector extends Component<HttpsSelectorProps, HttpsSelectorState> {
	constructor(props: HttpsSelectorProps) {
		super(props);
		this.state = {
			corsTypes: ['Any', true, false],
			selectedCors: 'Any',
		};
	}
	private handleChange = (e: any) => {
		this.setState({ selectedCors: e.target.value });
	}
	public render() {
		const corsTypes: JSX.Element[] = this.state.corsTypes.map((type) => {
			let typeName: string;
			switch (type) {
				case true:
					typeName = 'Yes';
					break;
				case false:
					typeName = 'No';
					break;
				default:
					typeName = 'Any';
					break;
			}
			return (
				<option key={type} value={type.toString()}>{typeName}</option>
			);
		});
		return (
			<div className="form-group">
				<label for="https-select">Https?</label>
				<select onChange={(e: Event) => { this.props.onChange(e, this.props.queryOption); }} name="https-select">
					{corsTypes}
				</select>
			</div>
		);
	}
}
