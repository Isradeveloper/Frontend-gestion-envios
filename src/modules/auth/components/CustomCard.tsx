import { styled } from "@mui/material";
import MuiCard, { CardProps } from "@mui/material/Card";
import { ReactNode } from "react";

const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

interface CustomCardProps extends CardProps {
  children: ReactNode;
}

export const CustomCard = ({ children, ...props }: CustomCardProps) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};