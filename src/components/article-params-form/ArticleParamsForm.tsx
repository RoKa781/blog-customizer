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
	articleState: ArticleStateType;
	setArticleState: (params: React.SetStateAction<ArticleStateType>) => void;
};

export const ArticleParamsForm: React.FC<TArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localState, setLocalState] = useState<ArticleStateType>(articleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setLocalState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const formElementRef = useRef<HTMLDivElement | null>(null);

	const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(localState);
	};

	const handleClearForm = () => {
		setLocalState(defaultArticleState);
		setArticleState(defaultArticleState);
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
						selected={localState.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер Шрифта'
					/>
					<Select
						options={fontColors}
						selected={localState.fontColor}
						onChange={handleOnChange('fontColor')}
						title='Цвет Шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={handleOnChange('contentWidth')}
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
