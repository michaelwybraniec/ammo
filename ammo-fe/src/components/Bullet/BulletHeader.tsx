import React, { ReactElement } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ToolTip from 'components/misc/ToolTip';
import DownCarretIcon from 'assets/icons/down_carret.svg';
import useI18n from 'hooks/useI18n';
import Bullet from 'shared/types/Bullet';
import useMQ from 'hooks/useMQ';
import Palette from 'material/Palette';
import { urlWithoutOrigin, isHttpErrorCode } from 'util/NetUtil';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: Palette.BLACK_LIGHT,
        color: Palette.WHITE,
        padding: '2px 7px',
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%',
    },
    ms: {
        marginRight: '12px',
        color: Palette.WHITE,
    },
    methodBadge: {
        margin: '0 12px 0 0',
        padding: '0 9px',
        borderRadius: '3px',
        backgroundColor: Palette.BLUE_DARKER,
        color: Palette.BLUE_LIGHTER,
    },
    url: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    statusBadge: {
        margin: '0 12px',
        padding: '0 3px',
        borderRadius: '3px',
    },
    successStatusBadge: {
        backgroundColor: Palette.GREEN_DARKER,
        color: Palette.GREEN_LIGHT,
    },
    errorStatusBadge: {
        backgroundColor: Palette.RED_DARKER,
        color: Palette.RED_MED,
    },
    filler: {
        flexGrow: 1,
    },
    downCarretIcon: {
        marginTop: '6px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    flipY: {
        transform: 'scaleY(-1)',
    },
}));

export interface BulletHeaderProps {
    bullet: Bullet;
    collapse?: boolean;
    onClick: () => void;
}

const BulletHeader = ({
    bullet,
    collapse = true,
    onClick,
}: BulletHeaderProps): ReactElement => {
    const classes = useStyles();
    const { isSMDown } = useMQ();
    const i18n = useI18n();

    const statusBadgeClassName = isHttpErrorCode(bullet.response.status)
        ? classes.errorStatusBadge
        : classes.successStatusBadge;

    return (
        <Box data-cy={`bullet-header-${bullet.id}`} className={classes.root}>
            {!isSMDown && (
                <Box
                    data-cy={`bullet-header-ms-${bullet.id}`}
                    className={classes.ms}
                >
                    <Typography>
                        ::{new Date(bullet.date).getMilliseconds()}
                    </Typography>
                </Box>
            )}
            <Box
                data-cy={`bullet-header-method-${bullet.id}`}
                className={classes.methodBadge}
            >
                <Typography>{bullet.method.toUpperCase()}</Typography>
            </Box>
            <Box
                data-cy={`bullet-header-url-${bullet.id}`}
                className={classes.url}
            >
                <Typography>
                    {isSMDown ? urlWithoutOrigin(bullet.url) : bullet.url}
                </Typography>
            </Box>
            <Box
                data-cy={`bullet-header-filler-${bullet.id}`}
                className={classes.filler}
            />
            {bullet.response.status && (
                <Box
                    data-cy={`bullet-header-status-${bullet.id}`}
                    className={`${classes.statusBadge} ${statusBadgeClassName}`}
                >
                    <Typography>{bullet.response.status}</Typography>
                </Box>
            )}
            <ToolTip
                uuid={`bullet-header-collapse-tooltip-${bullet.id}`}
                title={i18n(collapse ? 'Uncollapse' : 'Collapse')}
            >
                <Box
                    onClick={onClick}
                    onKeyDown={onClick}
                    data-cy={`bullet-header-collapse-${bullet.id}`}
                >
                    <img
                        src={DownCarretIcon}
                        alt={i18n(
                            collapse
                                ? 'Img.Alt.DownCarretIcon'
                                : 'Img.Alt.UpCarretIcon'
                        )}
                        className={`${classes.downCarretIcon} ${
                            collapse ? '' : classes.flipY
                        }`}
                    />
                </Box>
            </ToolTip>
        </Box>
    );
};

export default BulletHeader;
