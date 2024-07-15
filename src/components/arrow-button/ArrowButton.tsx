import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { SyntheticEvent } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type TArrowButtonProps = {
	onClick: (evt: SyntheticEvent) => void;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
