import { h, Component } from 'preact';
import '../styles/_modal.scss';

interface ModalProps {
	content: JSX.Element;
	title: string;
	   onRef: (el: any) => void;
}
interface ModalState {
	active: boolean;
}

export default class Modal extends Component<ModalProps, ModalState> {
	constructor(props: ModalProps) {
		super(props);
		this.state = {
			active: false,
		};
	}
	   public componentDidMount() {
		this.props.onRef(this);
	}
	   public componentWillUnmount() {
		this.props.onRef(undefined);
	}
	   public toggleModal = (): void => {
		this.setState({
			active: !this.state.active,
		});
	}
	   public render() {
		return (
			<div className={`modal--background ${this.state.active ? 'open' : 'closed'}`}>
				<div className="modal--foreground">
					<div className="modal__controls">
						<button onClick={this.toggleModal} className="close-modal light small">X</button>
					</div>
					<div className="modal__content">
						<h1>{this.props.title}</h1>
						{this.props.content}
					</div>
				</div>
			</div>
		);
	}
}
