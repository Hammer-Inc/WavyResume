import {Button, CardActions, CardContent, Grid, Icon, Tooltip} from "@mui/material";
import React, {FunctionComponent} from "react";
import {InteractionItem, WaveCardSection as WaveCardSectionType} from "../../../store/types/home";
import SectionContainer from "../SectionContainer";
import WaveCard from "../WaveCard";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../elements/SectionContentMarkdown";
import SectionTitleMarkdown from "../elements/SectionTitleMarkdown";

const WaveCardList: FunctionComponent<WaveCardSectionType> = ({items, content}) => {
  const makeButtons = (chip: InteractionItem) => {
    const {link, title, tooltip, icon} = chip;
    const button = <Button key={link} href={link} size={"small"} variant={"outlined"} color={"inherit"}>
      {icon && <Icon color={"action"} sx={{mr: 1}}>{icon}</Icon>}{title}
    </Button>
    if (tooltip) {
      return <Tooltip key={link} title={tooltip}>{button}</Tooltip>
    }
    return button
  };

  return <SectionContainer>
    <Grid xs={12} item>
      <SectionTitleMarkdown content={content}/>
    </Grid>
    {items && items.map((card, i) => {
      return <WaveCard
        key={`${card.order}_${card.content}`}
        inverse={i % 2 === 0}
      >
        <CardContent sx={{flexGrow: 1}}>
          {card?.title && <SectionContentMarkdown className={"header"} content={card.title}/>}
          <SectionContentMarkdown content={card.content}/>
        </CardContent>
        <CardActions>
          {card?.buttons?.map && slice(card.buttons.map(makeButtons), 0, 3)}
        </CardActions>
      </WaveCard>;
    })}
  </SectionContainer>;
};

export default WaveCardList