import { h, Component } from 'preact';

interface AuthSelectorState {
	selectedAuth: 'OAuth' | 'X-Mashape-Key' | 'apiKey' | 'Any';
	authTypes: string[];
}
interface AuthSelectorProps {
	queryOption: string;
	onChange: (e: any, parameter: string) => void;
}

export default class AuthSelector extends Component<AuthSelectorProps, AuthSelectorState> {
	constructor(props: AuthSelectorProps) {
		super(props);
		this.state = {
			authTypes: ['Any', 'OAuth', 'X-Mashape-Key', 'apiKey'],
			selectedAuth: 'Any',
		};
	}
	private handleChange = (e: any) => {
		this.setState({ selectedAuth: e.target.value });
		console.log(this.state.selectedAuth);
	}
	public render() {
		const authTypes: JSX.Element[] = this.state.authTypes.map((type) => {
			return (
				<option key={type} value={type}>{type}</option>
			);
		});
		return (
			<div className="form-group">
				<label for="auth-select">Auth Types</label>
				<select onChange={(e: Event) => { this.props.onChange(e, this.props.queryOption); }} name="auth-select" id="">
					{authTypes}
				</select>
			</div>
		);
	}
}
