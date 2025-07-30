import { useState } from "react";

export interface FilterBarProps {
	onTypeChange: (type: string | null) => void;
	onGenreChange: (genre: string | null) => void;
}

const types = [
	"CLASSIC",
	"JAZZ",
	"CHILDRENS_SONG",
	"BALLET",
	"ROCK",
	"HIP_HOP",
];

const genres = [
	"CONCERT",
	"MUSICAL",
	"CHILDRENS_THEATER",
	"DANCE",
	"PLAY",
	"OPERA",
];

export default function FilterBar({
	onTypeChange,
	onGenreChange,
}: FilterBarProps) {
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

	const handleTypeClick = (type: string | null) => {
		const newType = selectedType === type ? null : type;
		setSelectedType(newType);
		onTypeChange(newType);
	};

	const handleGenreClick = (genre: string | null) => {
		const newGenre = selectedGenre === genre ? null : genre;
		setSelectedGenre(newGenre);
		onGenreChange(newGenre);
	};

	return (
		<>
			<div>
				<h3>유형</h3>
				{types.map((type) => (
					<button
						key={type}
						type="button"
						onClick={() => handleTypeClick(type)}>
						{type}
					</button>
				))}
			</div>

			<div>
				<h3>장르</h3>
				{genres.map((genre) => (
					<button
						key={genre}
						type="button"
						onClick={() => handleGenreClick(genre)}>
						{genre}
					</button>
				))}
			</div>
		</>
	);
}
