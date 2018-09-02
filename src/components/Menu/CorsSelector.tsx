import { h, Component } from 'preact';

interface CorsSelectorState {
	selectedCors: 'yes' | 'no' | 'unknown' | 'Any';
	corsTypes: string[];
}
interface CorsSelectorProps {
	queryOption: string;
	onChange: (e: any, parameter: string) => void;
}

export default class CorsSelector extends Component<CorsSelectorProps, CorsSelectorState> {
	constructor(props: CorsSelectorProps) {
		super(props);
		this.state = {
			corsTypes: ['Any', 'Yes', 'No', 'Unknown'],
			selectedCors: 'Any',
		};
	}
	private handleChange = (e: any) => {
		this.setState({ selectedCors: e.target.value });
		console.log(this.state.selectedCors);
	}
	public render() {
		const corsTypes: JSX.Element[] = this.state.corsTypes.map((type) => {
			return (
				<option key={type} value={type}>{type}</option>
			);
		});
		return (
			<div className="form-group">
				<label for="cors-select">Cors Type</label>
				<select onChange={(e: Event) => { this.props.onChange(e, this.props.queryOption); }} name="cors-select" id="">
					{corsTypes}
				</select>
			</div>
		);
	}
}
