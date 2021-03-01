import React, {useContext, useState} from "react";

import {Box, Checkbox, FormControlLabel, FormGroup, Grid, Tab, Tabs} from "@material-ui/core";

import {useQuery} from "@apollo/client";
import {GetOwnedItems} from "../../../graphql/query";

import Item from "../../UI/Item";
import {AuthContext} from "../../Router";

const Collection = props =>
{
	const [selectedTab, setSelectedTab] = useState(0);
	const [filters, setFilters] = useState({showOwned: true, showUnowned: false});

	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Grid container justify={"space-between"}>
				<Grid item>
					<Tabs
						value={selectedTab}
						indicatorColor="primary"
						textColor="primary"
						onChange={(e, tab) => setSelectedTab(tab)}
					>
						<Tab label="Piece Skins" disableRipple/>
						<Tab label="Board Skins" disableRipple />
					</Tabs>
				</Grid>
				<Grid item>
					<FormGroup row>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={filters.showOwned}
									onChange={() => setFilters(filters => ({...filters, showOwned: !filters.showOwned}))}
								/>
							}
							label="Show Owned"
						/>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={filters.showUnowned}
									onChange={() => setFilters(filters => ({...filters, showUnowned: !filters.showUnowned}))}
								/>
							}
							label="Show Unowned"
						/>
					</FormGroup>
				</Grid>
			</Grid>
			<Box mt={4} pr={4} flexGrow={1} height={500} className={"verticalScrollDiv"}>
				<SelectedTab selectedTab={selectedTab} filters={filters}/>
			</Box>
		</Box>
	);
}

const SelectedTab = props =>
{
	switch (props.selectedTab) {
		case 0:
			return <PieceSkins filters={props.filters}/>;
		case 1:
			return <BoardSkins filters={props.filters}/>;
		default:
			return null;
	}
}

const PieceSkins = props =>
{
	let authData = useContext(AuthContext);

	const { loading, error, data } = useQuery(GetOwnedItems, {
		variables: { _id: authData.playerID }
	});

	const unownedItems = [{
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}]

	if (loading) return null;
	if (error) return null;

	return(
		<Grid container spacing={4}>
			{props.filters.showOwned ? data.user.items.map((item, index)  =>
				<Grid item key={index}>
					<Item name={item.name} description={item.description}/>
				</Grid>
			) : null}
			{props.filters.showUnowned ? unownedItems.map((item, index)  =>
				<Grid item key={index}>
					<Item name={item.name} description={item.description}/>
				</Grid>
			) : null}
		</Grid>
	)
}

const BoardSkins = props =>
{
	const ownedItems = [{
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}]
	const unownedItems = [{
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}, {
		name: "Item Name",
		description: "Item Description"
	}]

	return(
		<Grid container spacing={4}>
			{props.filters.showOwned ? ownedItems.map((item, index)  =>
				<Grid item key={index}>
					<Item name={item.name} description={item.description}/>
				</Grid>
			) : null}
			{props.filters.showUnowned ? unownedItems.map((item, index)  =>
				<Grid item key={index}>
					<Item name={item.name} description={item.description}/>
				</Grid>
			) : null}
		</Grid>
	)
}

export default Collection;
