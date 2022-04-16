import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import { Chain } from "../../model/chain";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  chain?: Chain;
  price?: string;
  summary?: any;
  CHART_INTERVAL_DAYS: number;
  noPrices?: boolean;
  noVolumes?: boolean;
  noMissedBlocks?: boolean;

  constructor(public chainService: ChainService) {
    this.CHART_INTERVAL_DAYS = 14;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain) {
      let apiChainId = this.chain.apiChainId || this.chain.id;
      this.chainService.getChainSummary(apiChainId)
        .subscribe((summary: any) => {
          if (this.chain) {
            this.summary = summary;
            this.summary.blockTime = this.extractBlockTime(summary);
            this.summary.inflation = this.extractInflation(summary);
            this.summary.bondedTokens = this.extractBondedTokens(this.chain, summary);
            this.summary.totalSupply = this.extractTotalSupply(this.chain, summary);
            this.summary.communityPool = this.extractCommunityPool(this.chain, summary);
          }
        });
      let coingekoCoinId = this.chain.coingekoCoinId || this.chain.id;
      this.chainService.getCoingekoSummary(coingekoCoinId)
        .subscribe((coingekoSummary: any) => {
          this.price = this.extractPrice(coingekoSummary);
        });

      this.chainService.getCoingekoMarketData(coingekoCoinId, this.CHART_INTERVAL_DAYS)
        .subscribe((coingekoMarketData: any) => {
          this.drawPriceChart(coingekoMarketData);
          this.drawVolumeChart(coingekoMarketData);
        });

      this.chainService.getChainValidators(apiChainId)
        .subscribe((validators: any) => {
          if (this.chain) {
            this.drawVotingPowerChart(validators, this.chain);
            this.drawCommissionDistributionChart(validators);
            this.drawMissedBlocksChart(validators);
          }
        });
    }
  }

  extractBlockTime(summary: any): string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(summary.blockTime) + 's';
  }

  extractPrice(coingekoData: any): string {
    let price = coingekoData?.market_data?.current_price?.usd;
    if (!price) {
      return 'No Market Data Yet';
    }
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  extractInflation(summary: any): string {
    let inflation = summary.inflation;
    return this.displayPercent(inflation);
  }

  displayPercent(val: any): string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
      style: 'percent'
    }).format(val);
  }

  extractBondedTokens(chain: Chain, summary: any): string {
    let bondedTokens = summary.bondedTokens / Math.pow(10, chain.denomPow);
    return this.compactNumber(bondedTokens);
  }

  extractTotalSupply(chain: Chain, summary: any): string {
    let totalSupply = 0;
    summary.totalSupply.supply.forEach(function (item: any) {
      if (item.denom === chain.denomName) {
        totalSupply = +item.amount;
      }
    });
    totalSupply = totalSupply / Math.pow(10, chain.denomPow);
    return this.compactNumber(totalSupply);
  }

  extractCommunityPool(chain: Chain, summary: any): string {
    let communityPool = 0;
    summary.communityPool.forEach(function (item: any) {
      if (item.denom === chain.denomName) {
        communityPool = +item.amount;
      }
    });
    communityPool = communityPool / Math.pow(10, chain.denomPow);
    return this.compactNumber(communityPool);
  }

  compactNumber(num: number): string {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 0
    }).format(num);
  }

  drawPriceChart(coingekoMarketData: any): void {
    let prices = coingekoMarketData.prices.slice(0, -1);
    if (!prices.length) {
      this.noPrices = true;
      return;
    }

    let pricesX = prices.map((item: any) => item[0]);
    let pricesY = prices.map((item: any) => item[1]);

    let pricesLabels: any = [];
    pricesX.forEach((item: any) => {
      let priceLabel = new Date(item);
      pricesLabels.push(priceLabel.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
    });

    let priceChart = new Chart('priceChart', {
      type: 'line',
      data: {
        labels: pricesLabels,
        datasets: [
          {
            data: pricesY,
            borderColor: "rgb(234, 128, 252)",
            backgroundColor: "rgb(234, 128, 252, 0.1)",
            fill: true,
            borderWidth: 2,
            tension: 0.4,
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 15,
              family: 'Monaco'
            },
            bodyFont: {
              size: 15,
              family: 'Monaco'
            },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          },
          y: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          }
        }
      }
    });
  }

  drawVolumeChart(coingekoMarketData: any): void {
    let volume = coingekoMarketData.total_volumes.slice(0, -1);
    if (!volume.length) {
      this.noVolumes = true;
      return;
    }

    let volumeX = volume.map((item: any) => item[0]);
    let volumeY = volume.map((item: any) => item[1]);

    let volumeLabels: any = [];
    volumeX.forEach((item: any) => {
      let volumeLabel = new Date(item);
      volumeLabels.push(volumeLabel.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
    });

    let volumeChart = new Chart('volumeChart', {
      type: 'line',
      data: {
        labels: volumeLabels,
        datasets: [
          {
            data: volumeY,
            borderColor: "rgb(234, 128, 252)",
            backgroundColor: "rgb(234, 128, 252, 0.1)",
            fill: true,
            borderWidth: 2,
            tension: 0.4,
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 15,
              family: 'Monaco'
            },
            bodyFont: {
              size: 15,
              family: 'Monaco'
            },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          },
          y: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          }
        }
      }
    });
  }

  drawVotingPowerChart(validators: any, chain: Chain): void {
    let top20validators = validators.slice(0, 19);
    let labels = top20validators.map((validator: any) => validator.moniker);
    let data = top20validators.map((validator: any) => validator.votingPower / Math.pow(10, chain.denomPow))
    let votingPowerChart = new Chart('votingPowerChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#89D4F5', '#BCD759', '#FFBF00', '#9961A7',
              '#4891EA', '#EE965B', '#F284D1', '#6FDBCB',
              '#2D71C4', '#EF5A5A', '#609C29', '#C69B06',
              '#8A2299', '#996D6C', '#2F2F6C', '#1C6C61',
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        }
      }
    });
  }

  drawCommissionDistributionChart(validators: any): void {
    let commissionDistribution: any = {};
    validators.forEach((validator: any) => {
      if (!commissionDistribution[validator.commission]) {
        commissionDistribution[validator.commission] = 0;
      }
      commissionDistribution[validator.commission]++;
    });

    let sortableArray: any = [];
    for (let commission in commissionDistribution) {
      sortableArray.push([commission, commissionDistribution[commission]]);
    }

    sortableArray = sortableArray.sort((a: any, b: any) => b[1] - a[1]);
    sortableArray = sortableArray.slice(0, 9);

    let labels = sortableArray.map((res: any) => this.displayPercent(res[0]));
    let data = sortableArray.map((res: any) => res[1]);
    let commissionChart = new Chart('commissionChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#89D4F5', '#BCD759', '#FFBF00', '#9961A7',
              '#4891EA', '#EE965B', '#F284D1', '#6FDBCB',
              '#2D71C4', '#EF5A5A', '#609C29', '#C69B06',
              '#8A2299', '#996D6C', '#2F2F6C', '#1C6C61',
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        }
      }
    });
  }

  drawMissedBlocksChart(validators: any): void {

    let labels = validators.filter((validator: any) => validator.missedBlocks).map((validator: any) => validator.moniker);
    let data = validators.filter((validator: any) => validator.missedBlocks).map((validator: any) => validator.missedBlocks);

    if (!data.length) {
      this.noMissedBlocks = true;
      return;
    }

    let missedBlocksChart = new Chart('missedBlocksChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#89D4F5', '#BCD759', '#FFBF00', '#9961A7',
              '#4891EA', '#EE965B', '#F284D1', '#6FDBCB',
              '#2D71C4', '#EF5A5A', '#609C29', '#C69B06',
              '#8A2299', '#996D6C', '#2F2F6C', '#1C6C61',
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          },
          y: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          }
        }
      }
    });
  }
}
