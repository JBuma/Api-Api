import { h, Component } from 'preact';
import ApiSingle from './ApiSingle';
import '../styles/_APIList.scss';

interface APIListProps {
	ApiList: { count: number, entries: API[] };
}
export interface API {
	API: string;
	Auth: string;
	Category: string;
	Cors: string;
	Description: string;
	HTTPS: boolean;
	Link: string;
}

export class APIList extends Component<APIListProps, {}> {
	public render() {
		// TODO: Add pagination
		const ApiList: JSX.Element[] = this.props.ApiList.entries.map((api: API) => {
			return (
				<ApiSingle
					key={api.Link}
					name={api.API}
					auth={api.Auth}
					category={api.Category}
					cors={api.Cors}
					description={api.Description}
					hasHTTPS={api.HTTPS}
					link={api.Link}
				/>
			);
		});
		// console.log('Api list rerender', this.props.ApiList);
		// console.table(ApiList);
		return (
			<section className="api-list">
				<div className="info">
					<small><em>{this.props.ApiList.count} Api's Found</em></small>
				</div>
				<div className="list">
					{ApiList}
				</div>
			</section>
		);
	}
}
