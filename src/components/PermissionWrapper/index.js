import React from 'react';
import usePermissions from '@src/hooks/usePermissions';
import Typography from '../Typography';
import i18n from '@src/locales';
import Box from '../Box';
import colors from '@src/utils/colors';

const PermissionWrapper = ({
  children,
  andPermissions,
  orPermissions,
  showMessage,
}) => {
  const isAllowed = usePermissions({ andPermissions, orPermissions });
  if (isAllowed) {
    return children;
  }

  if (!isAllowed && showMessage) {
    return (
      <Box
        flexDirection="row"
        shadowDepth={2}
        background={colors.white}
        justify="center"
        align="center"
        margin={16}
      >
        <Typography>{i18n.t('not.allowed')}</Typography>
      </Box>
    );
  }

  return null;
};

export default PermissionWrapper;
