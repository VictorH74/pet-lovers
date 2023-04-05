import Select from "react-select";
import React, { CSSProperties } from "react";
import { faker } from "@faker-js/faker";
import InfiniteLoader from "react-window-infinite-loader";
import { VariableSizeList as List } from "react-window";

interface VirtualListProps {
  children: any;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: any[];
  loadNextPage: () => void;
  listStyle: { [key: string]: string | number };
  itemSize: () => number;
  height: number;
  width: number;
  listRef: any;
}

const VirtualizedList = ({
  children,
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  listStyle,
  itemSize,
  height,
  width,
  listRef,
}: VirtualListProps) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => undefined : loadNextPage;
  const isItemLoaded = (index: number) => {
    let length = (items.length - 1) * 2
    console.log("index-length", index + "-" + length)
    return !hasNextPage || index < length;
  }

  return (
    <InfiniteLoader
      data-testId="infinite-loader"
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => {
        return (
          <List
            ref={(currentRef) => {
              if (listRef) {
                listRef(currentRef);
              }
              ref(currentRef);
            }}
            width={width}
            height={height}
            itemCount={itemCount}
            itemSize={itemSize}
            style={listStyle}
            onItemsRendered={onItemsRendered}
            className="VirtualizedList-Component"
          >
            {(listProps) => children(listProps)}
          </List>
        );
      }}
    </InfiniteLoader>
  );
};

interface MenuListProps {
  children: any;
}

const MenuList: React.FC<MenuListProps> = (props) => {
  const listRef = React.useRef();
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const heightCalc = children.length * props.selectProps.itemSize();
  const customHeight = heightCalc >= 300 ? 300 : heightCalc;

  const currentIndex = Math.max(
    children.findIndex((child: any) => child.props.isFocused),
    0
  );
  // THIS IS BUGGED
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(currentIndex);
    }
  }, [currentIndex]);

  return (
    <VirtualizedList
      listRef={(ref) => {
        listRef.current = ref;
      }}
      width={100}
      height={customHeight}
      listStyle={{ width: "100%" }}
      items={children}

      hasNextPage={props.selectProps.hasNextPage}
      isNextPageLoading={props.selectProps.isLoading}
      loadNextPage={props.selectProps.loadNextPage}
      itemSize={props.selectProps.itemSize}
    >
      {({ index, style }: { index: number; style: CSSProperties }) => {
        return children[index] ? (
          <div style={style}>{children[index]}</div>
        ) : (
          <div style={style}>
            {children.length < 200 ? (
              <span>Loading...</span>
            ) : (
              <span>Finished.</span>
            )}
          </div>
        );
      }}
    </VirtualizedList>
  );
};

export default function Test() {
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // condition to stop calling loadMoreData function
  const hasNext = data.length < 100;

  // function where will call an api and return a array
  const service: () => Promise<any[]> = () => {
    return new Promise((resolve) => {
      return setTimeout(() => {
        resolve(
          new Array(10).fill(0).map((_, i) => ({
            value: i,
            label: faker.name.firstName("female"),
          }))
        );
      }, 1000);
    });
  };

  const loadMoreData = async () => {
    setIsLoading(true);
    const res: any[] = await service();

    setData((s) => [...s, ...res]);
    setIsLoading(false);
  };

  return (
    <Select
      className="default-select-virtualized-styles"
      classNamePrefix="select"
      name="color"
      options={data.map((item, index) => {
        return {
          value: index,
          label: item.name,
        };
      })}
      hasNextPage={hasNext}
      onChange={(e) => console.log(e)}
      isLoading={isLoading}
      maxMenuHeight={100}
      minMenuHeight={100}
      loadNextPage={loadMoreData}
      itemSize={() => 49}
      components={{
        MenuList,
      }}
    />
  );
}
