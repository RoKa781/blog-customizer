import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, SyntheticEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (params: React.SetStateAction<ArticleStateType>) => void;
};

export const ArticleParamsForm: React.FC<TArticleParamsFormProps> = ({
	state,
	setState,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		state.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		state.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		state.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(state.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		state.contentWidth
	);
	const formElementRef = useRef<HTMLDivElement | null>(null);

	const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setState({
			...state,
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	const handleClearForm = () => {
		setState(defaultArticleState);
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	const toggleIsOpen = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsOpen((prevState) => !prevState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formElementRef,
		onChange: setIsOpen,
	});

	const handleSelectClick = (evt: SyntheticEvent) => {
		evt.stopPropagation();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={formElementRef}
				onClick={handleSelectClick}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={setSelectedFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						title='Размер Шрифта'
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						title='Цвет Шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClearForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
