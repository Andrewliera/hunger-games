import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import LogoForm from "./LogoForm";
import LogoGrid from "./LogoGrid";
import robotoff from "../robotoff";
import { IS_DEVELOPMENT_MODE } from "../const";
import Button from "@mui/material/Button";

const AnnotateLogoModal = (props) => {
  const {
    isOpen,
    logos,
    closeAnnotation,
    toggleLogoSelection,
    afterAnnotation,
    value = "",
    type = "",
  } = props;

  const sendAnnotation = async ({ type, value }) => {
    try {
      if (!IS_DEVELOPMENT_MODE) {
        await robotoff.annotateLogos(
          logos
            .filter((logo) => logo.selected)
            .map(({ id }) => ({
              logo_id: id,
              value,
              type,
            }))
        );
      }
      logos
        .filter((logo) => logo.selected)
        .forEach(({ id }) => {
          toggleLogoSelection(id);
        });
      closeAnnotation();
      afterAnnotation?.(
        logos.filter((logo) => logo.selected),
        { value, type }
      );
    } catch {}
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={isOpen}
      onClose={closeAnnotation}
      maxWidth="xl"
      fullScreen={isMobile}
    >
      <DialogContent>
        <Typography variant="h5">Selected logos</Typography>
        <LogoGrid
          logos={logos.filter((logo) => logo.selected)}
          toggleLogoSelection={toggleLogoSelection}
          sx={{ padding: 0 }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <LogoForm
          value={value}
          type={type}
          request={sendAnnotation}
          sx={{ padding: [2, 4] }}
        />
      </DialogActions>
      <Button variant="contained" color="error" onClick={closeAnnotation}>
        Cancel
      </Button>
    </Dialog>
  );
};

export default AnnotateLogoModal;
