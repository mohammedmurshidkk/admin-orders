import Typography, { TypographyProps } from '@mui/material/Typography';

interface TextWithTooltipProps extends TypographyProps {
  text: string;
  limit: number;
}

const TextTruncate = ({ text, limit, ...rest }: TextWithTooltipProps) => {
  const isTextTruncated = text.length > limit;

  const truncatedText = isTextTruncated ? `${text.slice(0, limit)}...` : text;

  return (
    <Typography
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: isTextTruncated ? 'pointer' : 'default',
      }}
      {...rest}
    >
      {truncatedText}
    </Typography>
  );
};

export default TextTruncate;
